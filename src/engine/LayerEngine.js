// LayerEngine.js

class LayerEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id '${containerId}' not found.`);
        }
        this.layers = {};
    }

    /**
     * 새로운 레이어를 생성하고 컨테이너에 추가합니다.
     * @param {string} layerName - 레이어의 이름 (예: 'grid', 'unit', 'effect')
     * @param {number} zIndex - 레이어의 쌓임 순서 (CSS z-index)
     * @returns {HTMLElement} 생성된 레이어 요소
     */
    createLayer(layerName, zIndex) {
        if (this.layers[layerName]) {
            return this.layers[layerName]; // 이미 존재하면 반환
        }

        const layer = document.createElement('div');
        layer.id = `${layerName}-layer`;
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.zIndex = zIndex;

        this.container.appendChild(layer);
        this.layers[layerName] = layer;

        return layer;
    }

    /**
     * 특정 레이어를 가져옵니다.
     * @param {string} layerName - 가져올 레이어의 이름
     * @returns {HTMLElement | undefined} 해당 레이어 요소
     */
    getLayer(layerName) {
        return this.layers[layerName];
    }

    /**
     * 16x9 그리드 레이어를 생성합니다.
     * 컨테이너보다 약간 작게 만들어 체력바 등이 잘리지 않도록 합니다.
     */
    createGridLayer() {
        const gridLayer = this.createLayer('grid', 10);

        // 컨테이너보다 약간 작게 만들어 체력바 등이 잘리지 않도록 함
        gridLayer.style.width = '98%';
        gridLayer.style.height = '98%';
        gridLayer.style.top = '1%';
        gridLayer.style.left = '1%';

        // 그리드 레이아웃 설정
        gridLayer.style.display = 'grid';
        gridLayer.style.gridTemplateColumns = 'repeat(16, 1fr)';
        gridLayer.style.gridTemplateRows = 'repeat(9, 1fr)';

        // 개발 중 그리드를 시각적으로 확인하기 위한 셀(cell) 생성 (선택 사항)
        for (let i = 0; i < 16 * 9; i++) {
            const cell = document.createElement('div');
            // cell.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // 그리드 선
            gridLayer.appendChild(cell);
        }

        console.log("16x9 grid layer created.");
    }
}

export default LayerEngine;
