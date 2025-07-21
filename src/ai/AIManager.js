// src/ai/AIManager.js

import Blackboard from './Blackboard.js';
// 필요한 매니저와 노드들을 모두 import 합니다.
import TargetManager from '../manager/TargetManager.js';
import PathfinderEngine from '../engine/PathfinderEngine.js';
import SelectorNode from './nodes/SelectorNode.js';
import SequenceNode from './nodes/SequenceNode.js';
import FindTargetNode from './nodes/FindTargetNode.js';
import MoveToTargetNode from './nodes/MoveToTargetNode.js';
import AttackTargetNode from './nodes/AttackTargetNode.js';

/**
 * 게임 내 모든 AI 유닛을 관리하고, 각 유닛의 행동 트리를 실행합니다.
 */
class AIManager {
    constructor() {
        this.unitData = new Map(); // 유닛의 블랙보드와 행동 트리를 함께 관리
        // 매니저 인스턴스 생성
        this.targetManager = new TargetManager();
        this.pathfinderEngine = new PathfinderEngine();
    }

    /**
     * 새로운 AI 유닛을 등록하고, 블랙보드와 행동 트리를 생성합니다.
     * @param {object} unitInstance - AI에 의해 제어될 유닛
     * @param {Array<object>} enemyUnits - 해당 유닛의 적 목록
     */
    registerUnit(unitInstance, enemyUnits) {
        if (!this.unitData.has(unitInstance.id)) {
            const blackboard = new Blackboard();
            const behaviorTree = this.createWarriorBehaviorTree(enemyUnits); // 워리어용 트리 생성
            
            this.unitData.set(unitInstance.id, {
                instance: unitInstance,
                blackboard: blackboard,
                behaviorTree: behaviorTree,
            });
            console.log(`[AIManager] 유닛 ID ${unitInstance.id} (${unitInstance.name}) 등록 및 행동 트리 생성 완료.`);
        }
    }
    
    /**
     * 워리어 클래스를 위한 행동 트리를 조립합니다.
     * @param {Array<object>} enemyUnits - 적 유닛 목록
     * @returns {Node} - 조립된 행동 트리의 최상위(root) 노드
     */
    createWarriorBehaviorTree(enemyUnits) {
        // 행동 트리를 여기서 조립합니다.
        const rootNode = new SelectorNode([
            // 1순위: 체력이 낮은 적을 찾아 공격하는 시퀀스
            new SequenceNode([
                new FindTargetNode(this.targetManager, 'lowestHealth', enemyUnits),
                new MoveToTargetNode(this.pathfinderEngine),
                new AttackTargetNode(),
            ]),
            // 2순위: 가장 가까운 적을 찾아 공격하는 시퀀스
            new SequenceNode([
                new FindTargetNode(this.targetManager, 'nearest', enemyUnits),
                new MoveToTargetNode(this.pathfinderEngine),
                new AttackTargetNode(),
            ]),
        ]);
        return rootNode;
    }

    /**
     * 특정 유닛의 턴을 실행합니다.
     * @param {number} unitId - 턴을 실행할 유닛의 ID
     */
    executeTurn(unitId) {
        const data = this.unitData.get(unitId);
        if (!data) return;

        console.group(`[AIManager] --- ${data.instance.name} (ID: ${unitId}) 턴 시작 ---`);
        
        // 블랙보드 업데이트 로직 (필요시 여기에 추가)
        
        // 행동 트리 실행
        data.behaviorTree.evaluate(data.instance, data.blackboard);

        console.groupEnd();
    }
}

export default AIManager;
