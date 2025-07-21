// src/ai/nodes/FindTargetNode.js

import Node, { NodeState } from './Node.js';

/**
 * 특정 전략에 따라 타겟을 찾아 블랙보드에 저장하는 행동 노드입니다.
 */
class FindTargetNode extends Node {
    /**
     * @param {TargetManager} targetManager - 타겟을 찾기 위한 매니저
     * @param {string} strategy - 타겟 탐색 전략 ('lowestHealth' 또는 'nearest')
     * @param {Array<object>} enemyUnits - 적 유닛 목록
     */
    constructor(targetManager, strategy, enemyUnits) {
        super();
        this.targetManager = targetManager;
        this.strategy = strategy;
        this.enemyUnits = enemyUnits;
    }

    evaluate(unit, blackboard) {
        let target = null;
        if (this.strategy === 'lowestHealth') {
            target = this.targetManager.findLowestHealthEnemy(this.enemyUnits);
        } else if (this.strategy === 'nearest') {
            target = this.targetManager.findNearestEnemy(unit, this.enemyUnits);
        }

        if (target) {
            blackboard.set('currentTargetUnit', target);
            console.log(`[AI Node] ${unit.name}: 타겟 설정 (${this.strategy}) -> ${target.name}`);
            return NodeState.SUCCESS;
        } else {
            console.log(`[AI Node] ${unit.name}: 타겟을 찾지 못했습니다 (${this.strategy}).`);
            return NodeState.FAILURE;
        }
    }
}

export default FindTargetNode;
