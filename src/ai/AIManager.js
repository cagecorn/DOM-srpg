// src/ai/AIManager.js

import Blackboard from './Blackboard.js';

/**
 * 게임 내 모든 AI 유닛을 관리하고, 각 유닛의 블랙보드를 업데이트합니다.
 */
class AIManager {
    constructor() {
        // AI 유닛들의 블랙보드를 유닛 ID를 키로 하여 관리합니다.
        this.blackboards = new Map();
    }

    /**
     * 새로운 AI 유닛을 등록하고, 해당 유닛을 위한 블랙보드를 생성합니다.
     * @param {object} unitInstance - AI에 의해 제어될 유닛의 인스턴스
     */
    registerUnit(unitInstance) {
        if (!this.blackboards.has(unitInstance.id)) {
            this.blackboards.set(unitInstance.id, new Blackboard());
            console.log(`[AIManager] 유닛 ID ${unitInstance.id} (${unitInstance.name}) 등록 완료. 블랙보드를 생성합니다.`);
        }
    }

    /**
     * 특정 유닛의 블랙보드를 최신 상태로 업데이트합니다.
     * 이 함수는 해당 유닛의 턴이 시작될 때 호출되어야 합니다.
     * @param {object} currentUnit - 현재 턴인 유닛
     * @param {Array<object>} allUnits - 전투에 참여한 모든 유닛의 목록
     * @param {Array<object>} enemyUnits - 적군 유닛의 목록
     */
    updateBlackboard(currentUnit, allUnits, enemyUnits) {
        const blackboard = this.blackboards.get(currentUnit.id);
        if (!blackboard) return;

        console.log(`[AIManager] 유닛 ID ${currentUnit.id} (${currentUnit.name})의 블랙보드 업데이트 시작...`);

        // --- 여기에 블랙보드 데이터를 계산하는 로직이 들어갑니다 ---
        // 지금은 실제 계산 대신 어떤 작업을 해야 하는지 주석으로 남겨두겠습니다.

        // 1. 가장 가까운 적 찾기
        // const nearest = findNearestUnit(currentUnit, enemyUnits);
        // blackboard.set('nearestEnemy', nearest);

        // 2. 체력이 가장 적은 적 찾기
        // const lowestHealth = findLowestHealthUnit(enemyUnits);
        // blackboard.set('lowestHealthEnemy', lowestHealth);

        // 3. 공격 가능한 적 목록 업데이트
        // const inRange = findEnemiesInAttackRange(currentUnit, enemyUnits);
        // blackboard.set('enemiesInAttackRange', inRange);

        // ... 등등 모든 블랙보드 데이터를 계산하고 set() 합니다.
        
        console.log(`[AIManager] 블랙보드 업데이트 완료.`);
    }

    /**
     * 특정 유닛의 블랙보드 인스턴스를 가져옵니다.
     * @param {number} unitId - 유닛의 고유 ID
     * @returns {Blackboard | undefined}
     */
    getBlackboard(unitId) {
        return this.blackboards.get(unitId);
    }
}

export default AIManager;
