/* =====================================================
   PHYSICS CONSTANTS
   ===================================================== */
window.PHYS = {
    gravityTorque: 9.0,
    engineTorque: 11.5,
    brakeTorque: 35.0,
    inertia: 2.8,
    balanceAngle: 0.75,
    loopAngle: 1.30,
    frontSlamAngle: -0.25
};

/* =====================================================
   CENTER OF MASS OFFSET (relative to rear axle)
   ===================================================== */
window.COM = {
    x: 0.65,   // forward
    y: 1.15    // up
};

/* =====================================================
   PHYSICS UPDATE
   ===================================================== */
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

    /* ----- REAR BRAKE ----- */
    const brake =
        PHYS.brakeTorque *
        input.brake *
        Math.sign(state.angularVel || 1);

    /* ----- NET TORQUE ----- */
    const netTorque =
        engineTorque -
        gravity -
        brake;

   /* ----- GROUND SUPPORT ----- */
if (state.angle <= 0 && netTorque < 0) {
    // Front wheel on ground, prevent nose dive
    state.angularVel = 0;
    return;
}

    const angularAcc =
        netTorque / PHYS.inertia;

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
