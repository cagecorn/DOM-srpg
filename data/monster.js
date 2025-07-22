/**
 * 게임 내 몬스터에 대한 데이터를 정의합니다.
 * 각 몬스터는 고유한 스탯을 가집니다.
 */
export const monsters = {
    zombie: {
        name: '좀비',
        hp: 80,
        maxHp: 80,
        weight: 70,
        stats: {
            strength: 12,     // 힘
            agility: 5,       // 민첩
            endurance: 15,    // 인내
            intelligence: 1,  // 지능
            wisdom: 3,        // 지혜
            valor: 0,         // 용맹
            luck: 2,          // 운
            movement: 2       // 이동
        }
    }
};
