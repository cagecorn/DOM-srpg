// src/ai/nodes/IsTargetInRangeNode.js

import Node, { NodeState } from './Node.js';

class IsTargetInRangeNode extends Node {
    constructor(attackRange) {
        super();
        this.attackRange = attackRange;
    }

    evaluate(unit, blackboard) {
        const target = blackboard.get('currentTargetUnit');
        if (!target) {
            return NodeState.FAILURE;
        }

        const distance = Math.abs(unit.col - target.col) + Math.abs(unit.row - target.row);

        if (distance <= this.attackRange) {
            blackboard.set('isTargetInAttackRange', true);
            return NodeState.SUCCESS;
        } else {
            blackboard.set('isTargetInAttackRange', false);
            return NodeState.FAILURE;
        }
    }
}

export default IsTargetInRangeNode;
