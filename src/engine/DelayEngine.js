// src/engine/DelayEngine.js

/**
 * 게임 내에서 특정 시간 동안 대기하는 기능을 제공합니다.
 * Promise를 반환하여 비동기 작업 흐름을 제어합니다.
 */
class DelayEngine {
    /**
     * 지정된 시간(ms)만큼 실행을 중지합니다.
     * @param {number} duration - 대기할 시간 (밀리초)
     * @returns {Promise<void>} 지정된 시간이 지나면 resolve되는 Promise
     */
    hold(duration) {
        return new Promise(resolve => {
            setTimeout(resolve, duration);
        });
    }
}

export default DelayEngine;
