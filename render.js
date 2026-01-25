console.log("render.js loaded");
function render(ctx, canvas, state, input) {

    /* Background */
    ctx.fillStyle = "#1b1f2a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height * 0.6);
    ctx.rotate(state.angle * 0.15);

    /* Ground */
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-1000, 40);
    ctx.lineTo(1000, 40);
    ctx.stroke();

    /* Bike */
    ctx.save();
    ctx.rotate(state.angle);

    /* Frame */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-60, -20, 120, 12);

    /* Wheels */
    ctx.fillStyle = "#bbbbbb";
    ctx.beginPath();
    ctx.arc(-40, 0, 12, 0, Math.PI * 2);
    ctx.arc(40, 0, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();

    /* HUD */
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
