// src/ai/Blackboard.js

/**
 * AI 유닛의 의사결정에 필요한 모든 데이터를 저장하고 관리하는 중앙 데이터 저장소입니다.
 * 각 AI 유닛은 자신만의 블랙보드 인스턴스를 가집니다.
 */
class Blackboard {
    constructor() {
        // Map 객체를 사용하여 key-value 데이터를 효율적으로 관리합니다.
        this.data = new Map();

        // 논의된 모든 데이터 필드를 null 또는 기본값으로 초기화합니다.
        // 이렇게 하면 블랙보드의 구조를 한눈에 파악하기 쉽습니다.
        this.initializeDataKeys();
    }

    /**
     * 블랙보드에서 사용할 모든 데이터 키를 초기 상태로 설정합니다.
     */
    initializeDataKeys() {
        // --- 🎯 타겟팅 및 위치 관련 정보 ---
        this.set('nearestEnemy', null);          // 가장 가까운 적 유닛 인스턴스
        this.set('lowestHealthEnemy', null);     // 가장 체력이 적은 적 유닛 인스턴스
        this.set('currentTargetUnit', null);     // 이번 턴에 공격할 최종 목표 유닛
        this.set('optimalAttackPosition', null); // 현재 타겟을 공격하기 위한 최적의 위치 {x, y}
        this.set('safestRetreatPosition', null); // 후퇴 또는 카이팅을 위한 가장 안전한 위치 {x, y}
        this.set('enemiesInAttackRange', []);    // 현재 위치에서 바로 공격 가능한 적들의 목록

        // --- ⚔️ 전술적 상황 판단 정보 ---
        this.set('isThreatened', false);         // 현재 나를 공격할 수 있는 적에게 위협받고 있는지 여부
        this.set('squadAdvantage', 0);           // 전황의 유불리 (-1: 불리, 0: 비등, 1: 유리)
        this.set('enemyHealerUnit', null);       // 식별된 적 힐러 유닛 인스턴스

        // --- 🤖 AI 자신의 상태 정보 ---
        this.set('canUseSkill_1', false);        // 1번 스킬 사용 가능 여부
        this.set('canUseSkill_2', false);        // 2번 스킬 사용 가능 여부
        this.set('canUseSkill_3', false);        // 3번 스킬 사용 가능 여부
    }

    /**
     * 블랙보드에 데이터를 저장합니다.
     * @param {string} key - 데이터의 키
     * @param {*} value - 저장할 값
     */
    set(key, value) {
        this.data.set(key, value);
    }

    /**
     * 블랙보드에서 데이터를 가져옵니다.
     * @param {string} key - 가져올 데이터의 키
     * @returns {*} 저장된 값 또는 undefined
     */
    get(key) {
        return this.data.get(key);
    }

    /**
     * 블랙보드에 특정 키의 데이터가 있는지 확인합니다.
     * @param {string} key - 확인할 데이터의 키
     * @returns {boolean} 데이터 존재 여부
     */
    has(key) {
        return this.data.has(key);
    }
}

export default Blackboard;
