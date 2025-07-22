// src/engine/FormationEngine.js

import eventEngine from './EventEngine.js';

class FormationEngine {
    constructor(unitLayer, gridLayer) {
        this.unitLayer = unitLayer;
        this.gridLayer = gridLayer;
        this.grid = new Map();
    }

    /**
     * 그리드 좌표를 픽셀 좌표로 변환합니다.
     * @param {number} col - 그리드의 열
     * @param {number} row - 그리드의 행
     * @returns {{x: number, y: number}} 픽셀 좌표
     */
    getPixelCoordinates(col, row) {
        const gridRect = this.gridLayer.getBoundingClientRect();
        const containerRect = this.unitLayer.getBoundingClientRect();
        const gridCols = 16;
        const gridRows = 9;
        const cellWidth = gridRect.width / gridCols;
        const cellHeight = gridRect.height / gridRows;

        return {
            x: gridRect.left - containerRect.left + col * cellWidth,
            y: gridRect.top - containerRect.top + row * cellHeight,
        };
    }

    /**
     * 유닛을 새로운 그리드 좌표로 이동시킵니다.
     * @param {HTMLElement} unitSprite - 이동할 유닛의 스프라이트 요소
     * @param {{col: number, row: number}} startCoords - 시작 그리드 좌표
     * @param {{col: number, row: number}} endCoords - 목표 그리드 좌표
     * @param {AnimationEngine} animationEngine - 애니메이션을 처리할 엔진
     * @param {number} duration - 이동 애니메이션 시간
     * @param {function(): void} onUpdate - 애니메이션 중 매 프레임 호출될 콜백
     * @returns {Promise<void>} 이동 애니메이션이 완료되면 resolve되는 Promise
     */
    moveUnit(unitSprite, startCoords, endCoords, animationEngine, duration, onUpdate) {
        const startPos = this.getPixelCoordinates(startCoords.col, startCoords.row);
        const endPos = this.getPixelCoordinates(endCoords.col, endCoords.row);

        unitSprite.style.left = `${startPos.x}px`;
        unitSprite.style.top = `${startPos.y}px`;

        this.grid.delete(`${startCoords.col},${startCoords.row}`);

        return animationEngine
            .move(
                unitSprite,
                { x: 0, y: 0 },
                { x: endPos.x - startPos.x, y: endPos.y - startPos.y },
                duration,
                onUpdate,
            )
            .then(() => {
                const unitId = unitSprite.dataset.unitId;
                this.grid.set(`${endCoords.col},${endCoords.row}`, unitId);

                eventEngine.emit('unit_moved', { unitId, newCoords: endCoords });
            });
    }

    placeUnit(unitInstance, spriteUrl, col, row) {
        const sprite = document.createElement('img');
        sprite.src = spriteUrl;
        sprite.className = 'unit';
        sprite.style.position = 'absolute';
        sprite.dataset.unitId = unitInstance.id;

        const pos = this.getPixelCoordinates(col, row);
        sprite.style.left = `${pos.x}px`;
        sprite.style.top = `${pos.y}px`;

        const gridCols = 16;
        const cellWidth = this.gridLayer.getBoundingClientRect().width / gridCols;
        sprite.style.width = `${cellWidth}px`;
        sprite.style.height = 'auto';
        sprite.style.objectFit = 'contain';

        this.unitLayer.appendChild(sprite);
        this.grid.set(`${col},${row}`, unitInstance.id);

        unitInstance.col = col;
        unitInstance.row = row;

        return sprite;
    }
}

export default FormationEngine;
