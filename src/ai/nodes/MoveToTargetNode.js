// src/ai/nodes/MoveToTargetNode.js

import Node, { NodeState } from './Node.js';

/**
 * 블랙보드에 저장된 경로를 따라 목표 지점으로 이동하는 행동 노드입니다.
 */
class MoveToTargetNode extends Node {
    constructor() {
        super();
    }

    evaluate(unit, blackboard) {
        const path = blackboard.get('movementPath');
        if (!path || path.length === 0) {
            return NodeState.FAILURE;
        }

        const nextStep = path.shift();
        unit.col = nextStep.col;
        unit.row = nextStep.row;
        console.log(`[AI Node] ${unit.name} 이동 -> (${unit.col}, ${unit.row})`);

        blackboard.set('movementPath', path.length > 0 ? path : null);
        return NodeState.SUCCESS;
    }
}

export default MoveToTargetNode;
