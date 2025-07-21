// src/manager/TargetManager.js

/**
 * AI의 타겟팅 관련 로직을 처리합니다.
 * 다양한 조건에 맞는 유닛을 찾아 반환하는 역할을 합니다.
 */
class TargetManager {
    /**
     * 특정 유닛에게서 가장 가까운 적을 찾습니다.
     * @param {object} currentUnit - 기준이 되는 유닛
     * @param {Array<object>} enemyUnits - 대상이 되는 적 유닛 목록
     * @returns {object | null} 가장 가까운 적 유닛 또는 null
     */
    findNearestEnemy(currentUnit, enemyUnits) {
        // (구현 로직은 나중에 추가합니다)
        console.log(`[TargetManager] ${currentUnit.name}의 가장 가까운 적을 탐색합니다.`);
        // 지금은 임시로 첫 번째 적을 반환합니다.
        return enemyUnits.length > 0 ? enemyUnits[0] : null;
    }

    /**
     * 체력이 가장 낮은 적을 찾습니다.
     * @param {Array<object>} enemyUnits - 대상이 되는 적 유닛 목록
     * @returns {object | null} 체력이 가장 낮은 적 유닛 또는 null
     */
    findLowestHealthEnemy(enemyUnits) {
        // (구현 로직은 나중에 추가합니다)
        console.log(`[TargetManager] 체력이 가장 낮은 적을 탐색합니다.`);
        // 지금은 임시로 첫 번째 적을 반환합니다.
        return enemyUnits.length > 0 ? enemyUnits[0] : null;
    }
}

export default TargetManager;
