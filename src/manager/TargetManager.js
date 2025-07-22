// src/manager/TargetManager.js

/**
 * AI의 타겟팅 관련 로직을 처리합니다.
 * 다양한 조건에 맞는 유닛을 찾아 반환하는 역할을 합니다.
 */
class TargetManager {
    /**
     * 두 유닛 사이의 화면 상 거리를 계산합니다.
     * @param {object} unitA - 첫 번째 유닛
     * @param {object} unitB - 두 번째 유닛
     * @returns {number} 거리 값
     */
    getDistance(unitA, unitB) {
        const rectA = unitA.spriteElement.getBoundingClientRect();
        const rectB = unitB.spriteElement.getBoundingClientRect();

        const dx = rectA.left - rectB.left;
        const dy = rectA.top - rectB.top;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 특정 유닛에게서 가장 가까운 적을 찾습니다.
     * @param {object} currentUnit - 기준이 되는 유닛
     * @param {Array<object>} enemyUnits - 대상이 되는 적 유닛 목록
     * @returns {object | null} 가장 가까운 적 유닛 또는 null
     */
    findNearestEnemy(currentUnit, enemyUnits) {
        if (!enemyUnits || enemyUnits.length === 0) {
            return null;
        }

        let nearestEnemy = null;
        let minDistance = Infinity;

        enemyUnits.forEach(enemy => {
            const distance = this.getDistance(currentUnit, enemy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        });

        return nearestEnemy;
    }

    /**
     * 체력이 가장 낮은 적을 찾습니다.
     * @param {Array<object>} enemyUnits - 대상이 되는 적 유닛 목록
     * @returns {object | null} 체력이 가장 낮은 적 유닛 또는 null
     */
    findLowestHealthEnemy(enemyUnits) {
        if (!enemyUnits || enemyUnits.length === 0) {
            return null;
        }

        let lowestHealthEnemy = null;
        let minHp = Infinity;

        enemyUnits.forEach(enemy => {
            if (enemy.hp < minHp) {
                minHp = enemy.hp;
                lowestHealthEnemy = enemy;
            }
        });

        return lowestHealthEnemy;
    }
}

export default TargetManager;
