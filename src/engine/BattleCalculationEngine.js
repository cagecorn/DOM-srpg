// src/engine/BattleCalculationEngine.js

/**
 * 웹 워커를 사용하여 전투 계산을 비동기적으로 처리하는 엔진입니다.
 */
class BattleCalculationEngine {
    constructor() {
        this.worker = new Worker('./src/workers/BattleCalculationWorker.js', { type: 'module' });
        this.pendingCalculations = new Map();
    }

    /**
     * 공격자와 대상의 데이터를 워커에게 보내 데미지 계산을 요청합니다.
     * @param {object} attacker - 공격 유닛 인스턴스
     * @param {object} target - 대상 유닛 인스턴스
     * @returns {Promise<object>} 계산 결과를 담은 Promise
     */
    calculateDamage(attacker, target) {
        return new Promise((resolve, reject) => {
            const calculationId = `${attacker.id}-${target.id}-${Date.now()}`;
            this.pendingCalculations.set(calculationId, { resolve, reject });

            this.worker.postMessage({
                type: 'calculate_damage',
                payload: { attacker, target }
            });

            this.worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'calculation_complete') {
                    const promise = this.pendingCalculations.values().next().value;
                    if (promise) {
                        promise.resolve(payload);
                        this.pendingCalculations.clear();
                    }
                }
            };

            this.worker.onerror = (error) => {
                reject(error);
                this.pendingCalculations.clear();
            };
        });
    }
}

export default BattleCalculationEngine;
