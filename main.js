const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ===== GLOBAL GAME STATE ===== */
const state = {
    angle: 0,
    angularVel: 0,
    speed: 0,
    crashed: false
};

/* ===== DELTA TIME LOOP ===== */
let lastTime = performance.now();
function gameLoop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.033);
    lastTime = now;

    updatePhysics(state, input, dt);
    render(ctx, canvas, state, input);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
