// src/ai/nodes/FindPathToTargetNode.js

import Node, { NodeState } from './Node.js';

class FindPathToTargetNode extends Node {
    constructor(pathfinderEngine) {
        super();
        this.pathfinderEngine = pathfinderEngine;
    }

    evaluate(unit, blackboard) {
        const target = blackboard.get('currentTargetUnit');
        if (!target) {
            return NodeState.FAILURE;
        }

        const startCoords = { col: unit.col, row: unit.row };
        const endCoords = { col: target.col, row: target.row };

        const path = this.pathfinderEngine.findPath(startCoords, endCoords);
        if (path) {
            blackboard.set('movementPath', path);
            return NodeState.SUCCESS;
        } else {
            return NodeState.FAILURE;
        }
    }
}

export default FindPathToTargetNode;
