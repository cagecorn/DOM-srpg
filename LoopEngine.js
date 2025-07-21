// LoopEngine.js

class LoopEngine {
    constructor(updateCallback, drawCallback) {
        this.isRunning = false;
        this.lastTime = 0;
        this.update = updateCallback; // 상태 업데이트 콜백 함수
        this.draw = drawCallback;     // 렌더링 콜백 함수
    }

    // 루프 시작
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        requestAnimationFrame(this.loop.bind(this));
    }

    // 루프 중지
    stop() {
        this.isRunning = false;
    }

    // 실제 루프 로직
    loop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 1. 상태 업데이트
        this.update(deltaTime);
        // 2. 화면 렌더링
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }
}

export default LoopEngine;
