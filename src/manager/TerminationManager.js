// src/manager/TerminationManager.js

import eventEngine from '../engine/EventEngine.js';

/**
 * 전투 종료 조건을 감지하고 결과를 알립니다.
 */
class TerminationManager {
    constructor() {
        this.isBattleOver = false;
        eventEngine.on('unit_dead', this.handleUnitDeath.bind(this));
    }

    /**
     * 유닛 사망 이벤트 처리.
     * @param {{unit: object, allUnits: Array<object>}} data
     */
    handleUnitDeath(data) {
        if (this.isBattleOver) return;

        const alive = data.allUnits.filter(u => u.hp > 0).map(u => u.type);
        const remainingTeams = new Set(alive);

        if (remainingTeams.size <= 1) {
            this.isBattleOver = true;
            const winnerTeam = remainingTeams.values().next().value;
            eventEngine.emit('battle_over', { winnerTeam });
            console.log(`[TerminationManager] 전투 종료: ${winnerTeam}`);
        }
    }
}

export default TerminationManager;
