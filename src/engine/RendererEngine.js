// RendererEngine.js

class RendererEngine {
    constructor() {
        this.container = document.getElementById('game-container');
    }

    // 단일 게임 객체를 렌더링
    render(gameObject) {
        if (!gameObject.element) {
            // DOM 요소가 없으면 생성
            gameObject.element = document.createElement('div');
            this.container.appendChild(gameObject.element);
        }
        
        // CSS를 업데이트하여 위치와 모양을 반영
        const el = gameObject.element;
        el.className = gameObject.type; // 'unit', 'effect' 등
        el.style.width = `${gameObject.width}px`;
        el.style.height = `${gameObject.height}px`;
        el.style.transform = `translate(${gameObject.x}px, ${gameObject.y}px)`;
    }

    // 모든 게임 객체를 렌더링
    renderAll(gameObjects) {
        gameObjects.forEach(obj => this.render(obj));
    }
}

export default RendererEngine;
