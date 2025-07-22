// src/engine/AnimationEngine.js

/**
 * DOM 요소의 애니메이션을 담당하는 엔진입니다.
 * requestAnimationFrame을 사용하여 부드럽고 효율적인 애니메이션을 구현합니다.
 */
class AnimationEngine {
    /**
     * 지정된 시간 동안 DOM 요소를 시작 위치에서 목표 위치로 부드럽게 이동시킵니다.
     * @param {HTMLElement} element - 이동할 DOM 요소
     * @param {{x: number, y: number}} startPos - 시작 픽셀 좌표 {x, y}
     * @param {{x: number, y: number}} endPos - 목표 픽셀 좌표 {x, y}
     * @param {number} duration - 애니메이션 지속 시간 (밀리초)
     * @param {function(object): void} onUpdate - 애니메이션의 각 프레임마다 호출될 콜백 함수. 현재 위치 {x, y}를 인자로 받습니다.
     * @returns {Promise<void>} 애니메이션이 완료되면 resolve되는 Promise
     */
    move(element, startPos, endPos, duration, onUpdate) {
        return new Promise(resolve => {
            let startTime = null;

            const animate = (currentTime) => {
                if (!startTime) {
                    startTime = currentTime;
                }

                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                const currentX = startPos.x + (endPos.x - startPos.x) * progress;
                const currentY = startPos.y + (endPos.y - startPos.y) * progress;

                element.style.transform = `translate(${currentX}px, ${currentY}px)`;

                if (onUpdate) {
                    onUpdate({ x: currentX, y: currentY });
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // 애니메이션이 끝나면 transform만 초기화합니다.
                    element.style.transform = '';
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }
}

export default AnimationEngine;
