// BirthCertificateManager.js

/**
 * 새로 생성된 유닛의 상세 정보를 콘솔에 출력하여 디버깅을 돕습니다.
 */
class BirthCertificateManager {
    /**
     * 유닛의 생성 정보를 기록합니다.
     * @param {object} unitInstance - 생성된 유닛의 인스턴스 객체
     */
    log(unitInstance) {
        console.group(`[출생신고서] ID: ${unitInstance.id} | 이름: ${unitInstance.name}`);
        console.log("타입:", unitInstance.type);
        console.log("상세 스탯:", unitInstance.stats);
        // 앞으로 더 많은 정보(스킬, 장비 등)가 추가될 수 있습니다.
        console.groupEnd();
    }
}

export default BirthCertificateManager;
