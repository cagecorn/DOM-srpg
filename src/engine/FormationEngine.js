// FormationEngine.js

import DebugCoordinateManager from '../manager/DebugCoordinateManager.js';

const debugCoordinateManager = new DebugCoordinateManager();

/**
 * 전투 그리드 위 유닛의 배치와 이동을 관리합니다.
 */
class FormationEngine {
    constructor(unitLayer, gridLayer) {
        if (!unitLayer || !gridLayer) {
            throw new Error('FormationEngine에는 유닛 레이어와 그리드 레이어가 필요합니다.');
        }
        this.unitLayer = unitLayer;
        this.gridLayer = gridLayer;
    }

    /**
     * 지정된 그리드 좌표에 유닛 스프라이트를 배치합니다.
     * @param {object} unitInstance - 배치할 유닛의 데이터 인스턴스
     * @param {string} spriteUrl - 유닛의 이미지 경로
     * @param {number} col - 그리드의 열 위치 (0부터 시작)
     * @param {number} row - 그리드의 행 위치 (0부터 시작)
     */
    placeUnit(unitInstance, spriteUrl, col, row) {
        const sprite = document.createElement('img');
        sprite.src = spriteUrl;
        sprite.className = 'unit';
        sprite.style.position = 'absolute';

        // 유닛의 고유 ID를 DOM 요소에 연결
        sprite.dataset.unitId = unitInstance.id;

        const gridCols = 16;
        const gridRows = 9;
        sprite.style.left = `${(col / gridCols) * 100}%`;
        sprite.style.top = `${(row / gridRows) * 100}%`;
        sprite.style.width = `${100 / gridCols}%`;
        sprite.style.height = `${100 / gridRows}%`;
        sprite.style.objectFit = 'contain';

        this.unitLayer.appendChild(sprite);

        sprite.onload = () => {
            debugCoordinateManager.log(`${unitInstance.name} (ID: ${unitInstance.id})`, sprite);
        };

        return sprite; // 생성된 스프라이트 요소를 반환합니다.
    }
}

export default FormationEngine;
