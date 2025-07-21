// src/engine/EventEngine.js

/**
 * 게임 내 모든 시스템 간의 통신을 중재하는 이벤트 방송국 역할을 합니다.
 * 이를 통해 각 시스템은 서로를 직접 알 필요 없이 소통할 수 있습니다. (디커플링)
 */
class EventEngine {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * 특정 이벤트가 발생했을 때 실행할 함수(리스너)를 등록합니다.
     * @param {string} eventName - 이벤트 이름 (예: 'unitAttacked')
     * @param {Function} callback - 실행될 콜백 함수
     */
    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);
    }

    /**
     * 특정 이벤트를 모든 리스너에게 방송(trigger)합니다.
     * @param {string} eventName - 방송할 이벤트 이름
     * @param {*} data - 이벤트와 함께 전달할 데이터
     */
    emit(eventName, data) {
        if (this.listeners.has(eventName)) {
            console.log(`[EventEngine] 이벤트 방송: "${eventName}"`, data);
            this.listeners.get(eventName).forEach(callback => callback(data));
        }
    }
}

// 이 엔진은 게임 전체에서 단 하나만 존재해야 하므로, 싱글턴 패턴으로 인스턴스를 export 합니다.
const eventEngine = new EventEngine();
export default eventEngine;
