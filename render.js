function render(ctx, canvas, state, input) {

    /* ===== BACKGROUND (SKY) ===== */
    ctx.fillStyle = "#2a3142";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    /* ===== CAMERA TRANSFORM =====
       World rotates opposite bike angle
       Camera is fixed to rider's head
    */
    const horizonY =
        canvas.height * 0.55 +
        state.angle * 220; // front lift visual

    ctx.translate(canvas.width / 2, horizonY);
    ctx.rotate(-state.angle * 0.85);

    /* ===== SKY GRADIENT ===== */
    const skyGrad = ctx.createLinearGradient(0, -canvas.height, 0, 0);
    skyGrad.addColorStop(0, "#1b1f2a");
    skyGrad.addColorStop(1, "#3b4a6b");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height);

    /* ===== GROUND ===== */
    ctx.fillStyle = "#444";
    ctx.fillRect(-canvas.width, 0, canvas.width * 2, canvas.height);

    /* ===== GROUND LINE ===== */
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-canvas.width, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    ctx.restore();

    /* ===== HANDLEBARS (HUD-LOCKED) ===== */
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height * 0.75);

    /* Bars */
    ctx.strokeStyle = "#bbb";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-120, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();

    /* Center clamp */
    ctx.fillStyle = "#999";
    ctx.fillRect(-10, -5, 20, 10);

    ctx.restore();

    /* ===== FRONT WHEEL (COMES INTO VIEW) ===== */
    const wheelLift = Math.max(0, state.angle) * 280;

    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height * 0.75 - wheelLift,
        28,
        0,
        Math.PI * 2
    );
    ctx.stroke();

    /* ===== HUD ===== */
    const hud = document.getElementById("hud");
    hud.innerHTML = `
        Angle: ${(state.angle * 180 / Math.PI).toFixed(1)}°<br>
        Throttle: ${input.throttle.toFixed(2)}<br>
        Brake: ${input.brake.toFixed(2)}<br>
        Weight: ${input.weight.toFixed(2)}<br>
        ${state.crashed ? "<span style='color:red'>CRASH</span>" : ""}
    `;

    document.getElementById("throttleFill").style.height =
        input.throttle * 100 + "%";
    document.getElementById("brakeFill").style.height =
        input.brake * 100 + "%";
}
