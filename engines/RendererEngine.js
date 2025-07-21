export class RendererEngine {
    constructor(gameBoardElement) {
        this.gameBoard = gameBoardElement;
    }

    createVisualElement(id, className, gridX, gridY) {
        const element = document.createElement('div');
        element.id = id;
        element.className = className;
        this.gameBoard.appendChild(element);
        this.updatePosition(element, gridX, gridY);
        return element;
    }

    updatePosition(element, gridX, gridY, gridSize = 32) {
        const x = gridX * gridSize;
        const y = gridY * gridSize;
        element.style.transform = `translate(${x}px, ${y}px)`;
    }

    drawGrid(grid) {
        grid.forEach((row, y) => {
            row.forEach((tile, x) => {
                this.createVisualElement(`tile_${x}_${y}`, `tile ${tile.type}`, x, y);
            });
        });
    }
}
