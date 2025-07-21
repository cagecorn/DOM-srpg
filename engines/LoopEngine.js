export class LoopEngine {
    constructor(updateCallback, drawCallback) {
        this.updateCallback = updateCallback;
        this.drawCallback = drawCallback;
        this.lastTime = 0;
        this.isRunning = false;

        // ensure gameLoop has correct this context
        this.gameLoop = this.gameLoop.bind(this);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop);
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // update game state
        this.updateCallback(deltaTime);
        // draw frame
        this.drawCallback();

        // queue next frame
        requestAnimationFrame(this.gameLoop);
    }
}
