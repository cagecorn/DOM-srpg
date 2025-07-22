// src/ai/nodes/MoveToTargetNode.js

import Node, { NodeState } from './Node.js';

// 이동 애니메이션과 VFX 위치 갱신을 담당합니다.

/**
 * 블랙보드에 저장된 경로를 따라 목표 지점으로 이동하는 행동 노드입니다.
 */
class MoveToTargetNode extends Node {
    constructor(formationEngine, animationEngine, vfxManager, bindingManager, delayEngine) {
        super();
        this.formationEngine = formationEngine;
        this.animationEngine = animationEngine;
        this.vfxManager = vfxManager;
        this.bindingManager = bindingManager;
        this.delayEngine = delayEngine;
    }

    async evaluate(unit, blackboard) {
        const path = blackboard.get('movementPath');
        if (!path || path.length === 0) {
            return NodeState.FAILURE;
        }

        const binding = this.bindingManager.getBinding(unit.id);
        if (!binding) return NodeState.FAILURE;

        const movePath = path.slice(0, unit.stats.movement);
        const destination = movePath[movePath.length - 1];

        const onUpdate = () => {
            this.vfxManager.updatePosition(binding.vfx, binding.sprite);
        };

        await this.formationEngine.moveUnit(
            binding.sprite,
            { col: unit.col, row: unit.row },
            destination,
            this.animationEngine,
            500,
            onUpdate
        );

        unit.col = destination.col;
        unit.row = destination.row;

        await this.delayEngine.hold(100);

        return NodeState.SUCCESS;
    }
}

export default MoveToTargetNode;
