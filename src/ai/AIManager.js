// src/ai/AIManager.js

import Blackboard from './Blackboard.js';
import TargetManager from '../manager/TargetManager.js';

/**
 * 게임 내 모든 AI 유닛을 관리하고, 각 유닛의 행동 트리를 실행합니다.
 */
class AIManager {
    constructor() {
        this.unitData = new Map(); // 유닛의 블랙보드와 행동 트리를 함께 관리
        // 매니저 인스턴스 생성
        this.targetManager = new TargetManager();
    }

    /**
     * 새로운 AI 유닛과 미리 생성된 행동 트리를 등록합니다.
     * @param {object} unitInstance - AI에 의해 제어될 유닛
     * @param {Array<object>} enemyUnits - 해당 유닛의 적 목록
     * @param {Node} behaviorTree - 이 유닛이 사용할 행동 트리의 최상위 노드
     */
    registerUnit(unitInstance, enemyUnits, behaviorTree) {
        if (this.unitData.has(unitInstance.id)) return;

        const blackboard = new Blackboard();
        blackboard.set('allUnits', [unitInstance, ...enemyUnits]);

        this.unitData.set(unitInstance.id, {
            instance: unitInstance,
            blackboard: blackboard,
            behaviorTree: behaviorTree,
        });
        console.log(`[AIManager] 유닛 ID ${unitInstance.id} (${unitInstance.name}) 등록 완료.`);
    }
    

    /**
     * 특정 유닛의 턴을 실행합니다.
     * @param {number} unitId - 턴을 실행할 유닛의 ID
     */
    async executeTurn(unitId) {
        const data = this.unitData.get(unitId);
        if (!data) return;

        console.group(`[AIManager] --- ${data.instance.name} (ID: ${unitId}) 턴 시작 ---`);
        
        // 블랙보드 업데이트 로직 (필요시 여기에 추가)
        
        // 행동 트리 실행
        await data.behaviorTree.evaluate(data.instance, data.blackboard);

        console.groupEnd();
    }
}

export default AIManager;
