// IdEngine.js

/**
 * 게임 내 모든 객체에 대해 고유한 ID를 생성하고 관리합니다.
 */
class IdEngine {
    constructor() {
        // ID는 1부터 시작하여 1씩 증가합니다.
        this.nextId = 1;
    }

    /**
     * 새로운 고유 ID를 발행합니다.
     * @returns {number} 새로운 ID
     */
    generate() {
        const id = this.nextId;
        this.nextId++;
        return id;
    }
}

export default IdEngine;
