// src/ai/nodes/AttackTargetNode.js

import Node, { NodeState } from './Node.js';
import eventEngine from '../../engine/EventEngine.js';

/**
 * 블랙보드에 저장된 타겟을 공격하는 행동 노드입니다.
 */
class AttackTargetNode extends Node {
    evaluate(unit, blackboard) {
        const target = blackboard.get('currentTargetUnit');
        if (!target) {
            return NodeState.FAILURE;
        }

        const isInRange = blackboard.get('isTargetInAttackRange');
        if (isInRange) {
            console.log(`[AI Node] ${unit.name}: ${target.name}을(를) 공격합니다!`);
            // EventEngine을 통해 공격 이벤트를 방송합니다.
            eventEngine.emit('unitAttacked', { attacker: unit, target: target });
            return NodeState.SUCCESS;
        } else {
            return NodeState.FAILURE;
        }
    }
}

export default AttackTargetNode;
