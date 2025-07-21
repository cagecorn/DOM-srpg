// UnitEngine.js

import IdEngine from './IdEngine.js';
import BirthCertificateManager from '../manager/BirthCertificateManager.js';
import { classes } from '../../data/class.js';
import { monsters } from '../../data/monster.js';

const idEngine = new IdEngine();
const birthCertificateManager = new BirthCertificateManager();

/**
 * 유닛 인스턴스를 생성하고 관리합니다.
 * '가챠'처럼 스탯이 변동되는 요소를 여기에 추가할 수 있습니다.
 */
class UnitEngine {
    /**
     * 지정된 타입과 키를 기반으로 새로운 유닛 인스턴스를 생성합니다.
     * @param {string} type - 생성할 유닛의 타입 ('class' 또는 'monster')
     * @param {string} key - 데이터 파일에 정의된 유닛의 키
     * @returns {object | null} 생성된 유닛 인스턴스 또는 null
     */
    createUnit(type, key) {
        let baseData;
        if (type === 'class' && classes[key]) {
            baseData = classes[key];
        } else if (type === 'monster' && monsters[key]) {
            baseData = monsters[key];
        } else {
            console.error(`'${type}' 타입에서 '${key}' 키를 찾을 수 없습니다.`);
            return null;
        }

        // 원본 데이터를 깊은 복사하여 새로운 인스턴스를 만듭니다.
        const unitInstance = JSON.parse(JSON.stringify(baseData));

        // 고유 ID 부여
        unitInstance.id = idEngine.generate();
        unitInstance.type = type;

        // (미래 확장) 이 부분에서 스탯에 랜덤 요소를 추가할 수 있습니다.

        // 출생신고서 매니저를 통해 생성 정보 기록
        birthCertificateManager.log(unitInstance);

        return unitInstance;
    }
}

export default UnitEngine;
