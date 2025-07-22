// src/ai/nodes/SequenceNode.js

import Node, { NodeState } from './Node.js';

/**
 * 모든 자식 노드가 성공해야만 성공합니다. 하나라도 실패하면 즉시 실패합니다. (AND 논리)
 */
class SequenceNode extends Node {
    constructor(children) {
        super();
        this.children = children;
    }

    async evaluate(unit, blackboard) {
        for (const child of this.children) {
            const result = await child.evaluate(unit, blackboard);
            if (result === NodeState.FAILURE || result === NodeState.RUNNING) {
                return result; // 하나라도 실패하거나 실행 중이면 즉시 반환
            }
        }
        return NodeState.SUCCESS; // 모두 성공했을 경우에만 성공 반환
    }
}

export default SequenceNode;
