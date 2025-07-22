// src/manager/DebugVFXManager.js

/**
 * 화면에 렌더링된 VFX 요소의 실제 좌표를 콘솔에 출력하여 디버깅을 돕습니다.
 */
class DebugVFXManager {
    /**
     * VFX 요소의 화면상 좌표 정보를 기록합니다.
     * @param {string} name - 식별을 위한 이름 (예: '워리어 VFX')
     * @param {HTMLElement} element - 좌표를 확인할 VFX 컨테이너 요소
     */
    log(name, element) {
        if (!element) {
            console.error(`[DebugVFXManager] '${name}'에 대한 요소를 찾을 수 없습니다.`);
            return;
        }
        const rect = element.getBoundingClientRect();
        console.group(`[DebugVFXManager] ${name} 좌표`);
        console.log(`- Top: ${rect.top.toFixed(2)}px, Left: ${rect.left.toFixed(2)}px`);
        console.log(`- Width: ${rect.width.toFixed(2)}px, Height: ${rect.height.toFixed(2)}px`);
        console.groupEnd();
    }
}

export default DebugVFXManager;
