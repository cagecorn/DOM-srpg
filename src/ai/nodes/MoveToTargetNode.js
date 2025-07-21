// src/ai/nodes/MoveToTargetNode.js

import Node, { NodeState } from './Node.js';

/**
 * 블랙보드에 저장된 타겟에게 이동하는 행동 노드입니다.
 * 지금은 이동 로직이 없으므로, 타겟이 있는지 확인만 합니다.
 */
class MoveToTargetNode extends Node {
    constructor(pathfinderEngine) {
        super();
        this.pathfinderEngine = pathfinderEngine;
    }

    evaluate(unit, blackboard) {
        const target = blackboard.get('currentTargetUnit');
        if (!target) {
            return NodeState.FAILURE; // 타겟이 없으면 이동 실패
        }

        // TODO: PathfinderEngine을 사용하여 실제 이동 로직 구현 필요
        // const path = this.pathfinderEngine.findPath(...);
        // 이동이 완료되기 전까지는 NodeState.RUNNING을 반환해야 합니다.

        console.log(`[AI Node] ${unit.name}: ${target.name}에게 이동을 시도합니다.`);
        // 지금은 이동이 즉시 성공했다고 가정합니다.
        return NodeState.SUCCESS;
    }
}

export default MoveToTargetNode;
