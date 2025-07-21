// DebugCoordinateManager.js

/**
 * 화면에 렌더링된 요소의 실제 좌표를 콘솔에 출력하여 디버깅을 돕습니다.
 */
class DebugCoordinateManager {
    /**
     * 요소의 화면상 좌표 정보를 기록합니다.
     * @param {string} name - 식별을 위한 이름
     * @param {HTMLElement} element - 좌표를 확인할 DOM 요소
     */
    log(name, element) {
        const rect = element.getBoundingClientRect();
        console.group(`[좌표 로그] ${name}`);
        console.log(`- Top: ${Math.round(rect.top)}px, Left: ${Math.round(rect.left)}px`);
        console.log(`- Width: ${Math.round(rect.width)}px, Height: ${Math.round(rect.height)}px`);
        console.groupEnd();
    }
}

export default DebugCoordinateManager;
