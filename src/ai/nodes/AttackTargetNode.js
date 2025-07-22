// src/ai/nodes/AttackTargetNode.js

import Node, { NodeState } from './Node.js';
import eventEngine from '../../engine/EventEngine.js';
import { createBloodSplatter } from '../../particles/BloodSplatter.js';

/**
 * 블랙보드에 저장된 타겟을 공격하는 행동 노드입니다.
 */
class AttackTargetNode extends Node {
    constructor(battleEngine, vfxManager, canvasEngine, debugManager, delayEngine) {
        super();
        this.battleEngine = battleEngine;
        this.vfxManager = vfxManager;
        this.canvasEngine = canvasEngine;
        this.debugManager = debugManager;
        this.delayEngine = delayEngine;
    }

    async evaluate(unit, blackboard) {
        const target = blackboard.get('currentTargetUnit');
        if (!target) {
            return NodeState.FAILURE;
        }

        const result = await this.battleEngine.calculateDamage(unit, target);
        const { targetId, damageDealt } = result;

        this.debugManager.logDamageCalculation(unit, target, damageDealt);

        target.hp -= damageDealt;
        this.vfxManager.updateHpBar(targetId, target.hp, target.maxHp);

        const targetSprite = document.querySelector(`.unit[data-unit-id="${targetId}"]`);
        if (targetSprite) {
            const rect = targetSprite.getBoundingClientRect();
            createBloodSplatter(this.canvasEngine, rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        await this.delayEngine.hold(500);

        if (target.hp <= 0) {
            eventEngine.emit('unit_dead', { unit: target, allUnits: blackboard.get('allUnits') });
        }

        return NodeState.SUCCESS;
    }
}

export default AttackTargetNode;
