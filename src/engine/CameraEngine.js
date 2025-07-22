// src/engine/CameraEngine.js

/**
 * DOM 기반 게임 월드의 카메라(줌, 패닝)를 제어하는 엔진입니다.
 * transform 속성을 사용하여 Reflow를 발생시키지 않고 GPU 가속을 활용합니다.
 */
class CameraEngine {
    /**
     * @param {HTMLElement} viewportElement - 카메라의 뷰포트 역할을 하는 바깥쪽 컨테이너입니다. (이벤트 리스너가 여기에 붙습니다)
     * @param {HTMLElement} worldElement - 실제 게임 콘텐츠가 담겨 움직이고 줌되는 안쪽 컨테이너입니다.
     */
    constructor(viewportElement, worldElement) {
        this.viewport = viewportElement;
        this.world = worldElement;

        // 카메라 상태
        this.scale = 1;
        this.minScale = 1; // 최소 줌 (기본)
        this.maxScale = 6; // 최대 줌
        this.x = 0;
        this.y = 0;

        // 드래그 상태
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this._init();
    }

    /**
     * 이벤트 리스너를 초기화하고 스타일을 설정합니다.
     */
    _init() {
        // DOM 가이드라인에 따라 transform이 변경될 것임을 브라우저에 알립니다.
        this.world.style.willChange = 'transform';
        this.world.style.transformOrigin = '0 0'; // 줌의 기준점을 좌측 상단으로 고정합니다.

        this.viewport.style.cursor = 'grab';
        this.viewport.style.overflow = 'hidden'; // 뷰포트를 벗어나는 내용은 보이지 않게 처리합니다.

        // 이벤트 리스너 바인딩
        this.viewport.addEventListener('wheel', this._onWheel.bind(this), { passive: false });
        this.viewport.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.viewport.addEventListener('mousemove', this._onMouseMove.bind(this));
        this.viewport.addEventListener('mouseup', this._onMouseUp.bind(this));
        this.viewport.addEventListener('mouseleave', this._onMouseUp.bind(this));
    }

    /**
     * 현재 카메라 상태(위치, 줌)를 world 엘리먼트의 transform 스타일에 적용합니다.
     */
    _applyTransform() {
        this.world.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }

    /**
     * 마우스 휠 이벤트 핸들러 (줌 인/아웃)
     */
    _onWheel(event) {
        event.preventDefault(); // 페이지 전체가 스크롤되는 것을 방지합니다.

        const zoomSpeed = 0.1;
        const zoomDirection = event.deltaY < 0 ? 1 : -1; // 휠을 올리면 1, 내리면 -1

        const oldScale = this.scale;
        // 새로운 스케일 계산 및 최소/최대값 제한
        this.scale += zoomDirection * zoomSpeed * this.scale; // 현재 스케일에 비례하여 줌 속도 조절
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale));

        // 마우스 커서 위치를 기준으로 줌이 되도록 처리합니다.
        const rect = this.viewport.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // 커서 위치를 기준으로 x, y 좌표를 보정합니다.
        this.x = mouseX - (mouseX - this.x) * (this.scale / oldScale);
        this.y = mouseY - (mouseY - this.y) * (this.scale / oldScale);

        this._applyTransform();
    }

    /**
     * 마우스 다운 이벤트 핸들러 (드래그 시작)
     */
    _onMouseDown(event) {
        if (event.button !== 0) return; // 좌클릭만 처리
        this.isDragging = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        this.viewport.style.cursor = 'grabbing';
    }

    /**
     * 마우스 이동 이벤트 핸들러 (드래그 중)
     */
    _onMouseMove(event) {
        if (!this.isDragging) return;

        const deltaX = event.clientX - this.lastMouseX;
        const deltaY = event.clientY - this.lastMouseY;

        this.x += deltaX;
        this.y += deltaY;

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

        this._applyTransform();
    }

    /**
     * 마우스 업/리브 이벤트 핸들러 (드래그 종료)
     */
    _onMouseUp() {
        this.isDragging = false;
        this.viewport.style.cursor = 'grab';
    }
}

export default CameraEngine;
