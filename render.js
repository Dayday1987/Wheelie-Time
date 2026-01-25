function render(ctx, canvas, state, input) {

    /* Clear */
    ctx.fillStyle = "#1c2233";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* ===== CAMERA: FIXED RIDER HEAD ===== */
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.6;

    ctx.save();

    /* World rotates, rider does NOT */
    ctx.translate(centerX, centerY);
    ctx.rotate(-state.angle);

    /* Sky */
    ctx.fillStyle = "#2f3b5c";
    ctx.fillRect(-2000, -2000, 4000, 2000);

    /* Ground */
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(-2000, 0, 4000, 2000);

    /* Horizon line */
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-2000, 0);
    ctx.lineTo(2000, 0);
    ctx.stroke();

    ctx.restore();

    /* ===== HANDLEBARS (SCREEN LOCKED) ===== */
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(centerX - 140, canvas.height * 0.8);
    ctx.lineTo(centerX + 140, canvas.height * 0.8);
    ctx.stroke();

    /* ===== FRONT WHEEL RISE ===== */
    const wheelY =
        canvas.height * 0.8 -
        Math.max(0, state.angle) * 320;

    ctx.strokeStyle = "#aaaaaa";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, wheelY, 26, 0, Math.PI * 2);
    ctx.stroke();

    /* HUD */
    document.getElementById("hud").innerHTML = `
        Angle: ${(state.angle * 180 / Math.PI).toFixed(1)}°<br>
        Throttle: ${input.throttle.toFixed(2)}<br>
        Brake: ${input.brake.toFixed(2)}
    `;
}
