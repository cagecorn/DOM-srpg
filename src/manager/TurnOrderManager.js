// src/manager/TurnOrderManager.js

/**
 * 유닛의 무게 값을 기준으로 턴 순서를 계산하고 관리합니다.
 * 무게가 가벼울수록 먼저 행동합니다.
 */
class TurnOrderManager {
    constructor() {
        this.turnOrder = [];
        this.currentTurnIndex = 0;
    }

    /**
     * 주어진 유닛 배열을 무게 기준으로 정렬하여 턴 순서를 초기화합니다.
     * @param {Array<object>} units - 전투에 참여하는 모든 유닛
     */
    initialize(units) {
        this.turnOrder = [...units].sort((a, b) => a.weight - b.weight);
        this.currentTurnIndex = 0;
        console.log('[TurnOrderManager] 턴 순서:', this.turnOrder.map(u => u.name));
    }

    /**
     * 현재 턴의 유닛을 반환합니다.
     * @returns {object}
     */
    getCurrentTurnUnit() {
        return this.turnOrder[this.currentTurnIndex];
    }

    /**
     * 다음 턴으로 진행하고 해당 유닛을 반환합니다.
     * @returns {object}
     */
    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        return this.getCurrentTurnUnit();
    }
}

export default TurnOrderManager;
