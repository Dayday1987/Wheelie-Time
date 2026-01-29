console.log("COCKPIT RENDER LOADED");

function render(ctx, canvas, state, input) {

    /* ===== CLEAR ===== */
    ctx.fillStyle = "#0e1118";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;

    /* =====================================================
       WORLD LAYER (PITCH ONLY)
       ===================================================== */
    const pitchOffset = state.angle * 380;
    const horizonY = canvas.height * 0.30 + pitchOffset * 1.15;

    ctx.save();
    ctx.translate(cx, horizonY);

    /* Sky gradient */
    const sky = ctx.createLinearGradient(0, -canvas.height, 0, 0);
    sky.addColorStop(0, "#1c2436");
    sky.addColorStop(1, "#3a4a6a");
    ctx.fillStyle = sky;
    ctx.fillRect(-2000, -2000, 4000, 2000);

    /* Sky depth / clouds (AFTER sky, BEFORE ground) */
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i < 6; i++) {
        ctx.fillRect(
            -2000 + i * 700,
            -1800,
            300,
            900
        );
    }

    /* Ground */
    ctx.fillStyle = "#2e2e2e";
    ctx.fillRect(-2000, 0, 4000, 2000);

    /* Horizon line */
    ctx.strokeStyle = "#9aa4b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-2000, 0);
    ctx.lineTo(2000, 0);
    ctx.stroke();

    ctx.restore();

    /* =====================================================
       COCKPIT LAYER (SCREEN-LOCKED)
       ===================================================== */
    const cockpitY = canvas.height * 0.72;
    const barPitch = state.angle * 12;

    ctx.save();
    ctx.translate(cx, cockpitY + barPitch);

    /* Tank top */
    ctx.fillStyle = "#1a1f2b";
    ctx.beginPath();
    ctx.moveTo(-160, 140);
    ctx.lineTo(-100, -20);
    ctx.lineTo(100, -20);
    ctx.lineTo(160, 140);
    ctx.closePath();
    ctx.fill();

    /* Triple clamp */
    ctx.fillStyle = "#8b8f9a";
    ctx.fillRect(-55, -30, 110, 22);

    /* Handlebar */
    ctx.strokeStyle = "#bfc3cc";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-220, -15);
    ctx.lineTo(220, -15);
    ctx.stroke();

    /* Bar ends */
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(-220, -15, 10, 0, Math.PI * 2);
    ctx.arc(220, -15, 10, 0, Math.PI * 2);
    ctx.fill();

    /* Dash cluster */
    ctx.fillStyle = "#10141c";
    ctx.fillRect(-65, -85, 130, 45);

    ctx.strokeStyle = "#4caf50";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -62, 18, Math.PI, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    /* =====================================================
       FRONT WHEEL (RISING INTO VIEW)
       ===================================================== */
    const wheelLift = Math.max(0, state.angle) * 520;
    const wheelY = cockpitY + 110 - wheelLift;

    ctx.strokeStyle = "#b0b0b0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, wheelY, 38, 0, Math.PI * 2);
    ctx.stroke();

    /* =====================================================
       HUD
       ===================================================== */
    document.getElementById("hud").innerHTML = `
        Angle: ${(state.angle * 180 / Math.PI).toFixed(1)}°<br>
        Throttle: ${input.throttle.toFixed(2)}<br>
        Brake: ${input.brake.toFixed(2)}
    `;
}
