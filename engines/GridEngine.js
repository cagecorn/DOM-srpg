export class GridEngine {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
    }

    createGrid() {
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push({ type: 'grass', unit: null });
            }
            this.grid.push(row);
        }
        console.log('Grid created:', this.grid);
    }

    getGrid() {
        return this.grid;
    }

    getTile(x, y) {
        if (this.grid[y] && this.grid[y][x]) {
            return this.grid[y][x];
        }
        return null;
    }
}
