/**
 * 게임 내 직업(클래스)에 대한 데이터를 정의합니다.
 * 각 직업은 고유한 스탯을 가집니다.
 */
export const classes = {
    warrior: {
        name: '워리어',
        hp: 100,
        maxHp: 100,
        weight: 50,
        stats: {
            strength: 15,     // 힘: 물리 근접공격력, 들 수 있는 무게 증가
            agility: 10,      // 민첩: 물리 원거리공격력, 정확도, 물리공격 회피율
            endurance: 12,    // 인내: 물리 방어력, 상태이상 저항력
            intelligence: 5,  // 지능: 마법 공격력, 상태이상 적용율
            wisdom: 8,        // 지혜: 마법 방어력, 무기 열망 수치 증가율
            valor: 10,        // 용맹: 초반 배리어 수치
            luck: 7,          // 운: 치명타율, 마법공격 회피율
            movement: 3       // 이동: 이동거리
        }
    }
};
