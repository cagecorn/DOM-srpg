// GameEngine.js

import LoopEngine from './LoopEngine.js';
import RendererEngine from './RendererEngine.js';
// ... 다른 엔진들을 불러옵니다.

class GameEngine {
    constructor() {
        this.loopEngine = new LoopEngine(this.update.bind(this), this.draw.bind(this));
        this.rendererEngine = new RendererEngine();
        // this.gridEngine = new GridEngine();
        // this.turnEngine = new TurnEngine();
        // this.imageLoader = new ImageLoaderEngine();

        this.gameObjects = []; // 게임에 등장하는 모든 객체를 관리합니다.
    }

    // 게임 시작 전 초기 설정
    init() {
        // 예: 이미지 리소스 로딩, 유닛 초기 배치 등
        console.log("Game Engine Initialized.");
    }

    // 게임 루프 시작
    start() {
        this.loopEngine.start();
        console.log("Game Started.");
    }

    // 게임 상태 업데이트 (매 프레임 호출)
    update(deltaTime) {
        // 모든 게임 객체의 상태를 업데이트합니다.
        // this.gameObjects.forEach(obj => obj.update(deltaTime));
    }

    // 화면 렌더링 (매 프레임 호출)
    draw() {
        // 모든 게임 객체를 화면에 그립니다.
        // this.rendererEngine.renderAll(this.gameObjects);
    }
}

export default GameEngine;
