// src/manager/DebugBattleCalculationManager.js

/**
 * 전투 계산과 관련된 모든 수치를 콘솔에 출력하여 디버깅을 돕습니다.
 */
class DebugBattleCalculationManager {
    /**
     * 데미지 계산 과정을 기록합니다.
     * @param {object} attacker - 공격 유닛
     * @param {object} target - 대상 유닛
     * @param {number} damage - 계산된 데미지
     */
    logDamageCalculation(attacker, target, damage) {
        console.group(`[전투 계산] ${attacker.name} -> ${target.name}`);
        console.log(`- 공격자 힘 (Strength): ${attacker.stats.strength}`);
        console.log(`- 대상 인내 (Endurance): ${target.stats.endurance}`);
        console.log(`%c- 최종 데미지: ${damage}`, 'color: yellow; font-weight: bold;');
        console.log(`- 대상 현재 HP: ${target.hp} -> ${target.hp - damage}`);
        console.groupEnd();
    }
}

export default DebugBattleCalculationManager;
