const input = {
    throttle: 0,
    brake: 0,
    clutch: 0,
    weight: 0
};

const touches = {};

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

canvas.addEventListener("touchstart", handleTouch);
canvas.addEventListener("touchmove", handleTouch);
canvas.addEventListener("touchend", endTouch);
canvas.addEventListener("touchcancel", endTouch);

function handleTouch(e) {
    e.preventDefault();
    for (const t of e.touches) {
        touches[t.identifier] = t;
    }
    processTouches();
}

function endTouch(e) {
    for (const t of e.changedTouches) {
        delete touches[t.identifier];
    }
    processTouches();
}

function processTouches() {
    input.throttle = 0;
    input.brake = 0;
    input.clutch = 0;
    input.weight = 0;

    for (const id in touches) {
        const t = touches[id];
        const x = t.clientX;
        const y = t.clientY;

        if (x > canvas.width * 0.7) {
            input.throttle = 1 - y / canvas.height;
        }

        if (x < canvas.width * 0.3) {
            input.brake = 1 - y / canvas.height;
        }

        const c = document.getElementById("clutch").getBoundingClientRect();
        if (x > c.left && x < c.right && y > c.top && y < c.bottom) {
            input.clutch = 1;
        }

        if (x > canvas.width * 0.3 && x < canvas.width * 0.7) {
            input.weight = clamp((x / canvas.width - 0.5) * 2, -1, 1);
        }
    }

    input.throttle = clamp(input.throttle, 0, 1);
    input.brake = clamp(input.brake, 0, 1);
}
