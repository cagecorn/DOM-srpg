// GridEngine.js

class GridEngine {
    constructor(tileWidth, tileHeight, gridWidth, gridHeight) {
        this.tileWidth = tileWidth;   // 타일 한 칸의 너비 (px)
        this.tileHeight = tileHeight;  // 타일 한 칸의 높이 (px)
        this.gridWidth = gridWidth;    // 그리드의 가로 타일 수
        this.gridHeight = gridHeight;  // 그리드의 세로 타일 수

        // 그리드 데이터를 저장할 2차원 배열
        this.gridData = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(null));
    }

    // 그리드 좌표를 픽셀 좌표로 변환
    gridToPixel(col, row) {
        const x = col * this.tileWidth;
        const y = row * this.tileHeight;
        return { x, y };
    }

    // 픽셀 좌표를 그리드 좌표로 변환
    pixelToGrid(x, y) {
        const col = Math.floor(x / this.tileWidth);
        const row = Math.floor(y / this.tileHeight);
        return { col, row };
    }

    // 특정 그리드 위치에 데이터 설정
    setTileData(col, row, data) {
        if (this.isValidCoordinate(col, row)) {
            this.gridData[row][col] = data;
        }
    }

    // 유효한 좌표인지 확인
    isValidCoordinate(col, row) {
        return col >= 0 && col < this.gridWidth && row >= 0 && row < this.gridHeight;
    }
}

export default GridEngine;
