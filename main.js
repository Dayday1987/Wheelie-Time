window.canvas = document.getElementById("game");
window.ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.state = {
    angle: 0,
    angularVel: 0,
    speed: 0,
    crashed: false
};

let lastTime = performance.now();
function gameLoop(now) {
    console.log("tick");
    
    const dt = Math.min((now - lastTime) / 1000, 0.033);
    lastTime = now;

    updatePhysics(state, input, dt);
    render(ctx, canvas, state, input);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
