// TurnEngine.js

class TurnEngine {
    constructor() {
        this.turnOrder = []; // 유닛들의 턴 순서를 담는 배열
        this.currentTurnIndex = 0;
    }

    // 턴 순서에 유닛들을 추가
    setupUnits(units) {
        this.turnOrder = units;
    }

    // 현재 턴의 유닛을 반환
    getCurrentUnit() {
        return this.turnOrder[this.currentTurnIndex];
    }
    
    // 다음 턴으로 전환
    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        // 턴 시작 이벤트 등을 여기에 발생시킬 수 있음
    }

    // 현재 턴을 시작
    startTurn() {
        const currentUnit = this.getCurrentUnit();
        // currentUnit.onTurnStart();
    }
}

export default TurnEngine;
