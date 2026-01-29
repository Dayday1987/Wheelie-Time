console.log("physics.js loaded", typeof updatePhysics);
window.PHYS = {
    gravityTorque: 9.0,
    engineTorque: 22.0,
    brakeTorque: 35.0,
    inertia: 1.6,
    balanceAngle: 0.75,
    loopAngle: 1.25,
    frontSlamAngle: -0.25
};

window.updatePhysics = function (state, input, dt) {
    if (state.crashed) return;

    const clutchFactor = 1 - input.clutch;

    let engineTorque =
        PHYS.engineTorque *
        input.throttle *
        clutchFactor;

    if (input.clutch < 0.1 && input.throttle > 0.7) {
        engineTorque *= 1.3;
    }

    const gravity =
        PHYS.gravityTorque *
        Math.sin((state.angle - input.weight * 0.25) * 0.85)

    const brake =
        PHYS.brakeTorque *
        input.brake *
        Math.sign(state.angularVel || 1);

    const netTorque =
        engineTorque -
        gravity -
        brake;

    const angularAcc =
        netTorque / PHYS.inertia;

    state.angularVel += angularAcc * dt;
    state.angle += state.angularVel * dt;

    if (
        state.angle > PHYS.loopAngle ||
        state.angle < PHYS.frontSlamAngle
    ) {
        state.crashed = true;
    }
};
