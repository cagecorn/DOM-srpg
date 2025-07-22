// src/workers/BattleCalculationWorker.js

/**
 * Web Worker에서 실행될 전투 계산 로직입니다.
 */
self.onmessage = function(event) {
    const { type, payload } = event.data;

    if (type === 'calculate_damage') {
        const { attacker, target } = payload;

        const baseDamage = attacker.stats.strength;
        const defense = target.stats.endurance;
        const damage = Math.max(1, baseDamage - defense);

        self.postMessage({
            type: 'calculation_complete',
            payload: {
                attackerId: attacker.id,
                targetId: target.id,
                damageDealt: damage
            }
        });
    }
};
