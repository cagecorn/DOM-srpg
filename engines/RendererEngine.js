export class RendererEngine {
    constructor(layerEngine) {
        this.layerEngine = layerEngine;
    }

    drawBackgroundImage(image) {
        const backgroundLayer = this.layerEngine.getLayer('background');
        backgroundLayer.style.backgroundImage = `url(${image.src})`;
    }

    drawGrid(grid, gridSize = 48) {
        const gridLayer = this.layerEngine.getLayer('grid');
        const gridContainer = document.createElement('div');
        gridContainer.id = 'grid-container';
        gridLayer.appendChild(gridContainer);

        grid.forEach((row, y) => {
            row.forEach((tile, x) => {
                const element = document.createElement('div');
                element.className = `tile ${tile.type}`;
                element.style.gridColumnStart = x + 1;
                element.style.gridRowStart = y + 1;
                gridContainer.appendChild(element);
            });
        });
    }
}
