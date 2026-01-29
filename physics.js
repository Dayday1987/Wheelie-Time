window.updatePhysics = function (state, input, dt) {
    if (state.crashed) return;

    /* ----- ENGINE TORQUE ----- */
    const clutchFactor = 1 - input.clutch;

    let engineTorque =
        PHYS.engineTorque *
        input.throttle *
        clutchFactor;

    // Clutch pop impulse
    if (input.clutch < 0.1 && input.throttle > 0.7) {
        engineTorque *= 1.15;
    }

    /* ----- COM-BASED GRAVITY ----- */
    const riderShift = input.weight * 0.25;

    const comX = COM.x + riderShift;
    const comY = COM.y;

    const rotatedCOMx =
        comX * Math.cos(state.angle) -
        comY * Math.sin(state.angle);

    const gravity =
        PHYS.gravityTorque * rotatedCOMx;

    /* ----- REAR BRAKE (velocity aware) ----- */
    const brake =
        PHYS.brakeTorque *
        input.brake *
        (1 + Math.abs(state.angularVel) * 0.6) *
        Math.sign(state.angularVel || 1);

    /* ----- NET TORQUE ----- */
    const netTorque =
        engineTorque -
        gravity -
        brake;

    /* ----- GROUND SUPPORT ----- */
    if (state.angle <= 0 && netTorque < 0) {
        state.angularVel = 0;
        return;
    }

    /* ----- ANGULAR DAMPING (MUST BE BEFORE angularAcc) ----- */
    const damping = -state.angularVel * 0.8;

    /* ----- ANGULAR MOTION ----- */
    const angularAcc =
        (netTorque + damping) / PHYS.inertia;

    state.angularVel += angularAcc * dt;
    state.angle += state.angularVel * dt;

    /* ----- FAILURE CONDITIONS ----- */
    if (
        state.angle > PHYS.loopAngle ||
        state.angle < PHYS.frontSlamAngle
    ) {
        state.crashed = true;
    }
};
