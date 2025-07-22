// src/engine/PathfinderEngine.js

/**
 * 그리드 기반의 경로 탐색을 담당합니다.
 */
class PathfinderEngine {
    /**
     * 시작 지점부터 목표 지점까지의 경로를 찾습니다.
     * 현재는 장애물을 고려하지 않고 목표에 인접한 직선 경로를 반환합니다.
     * @param {{col: number, row: number}} startCoords - 시작 좌표 { col, row }
     * @param {{col: number, row: number}} endCoords - 목표 좌표 { col, row }
     * @returns {Array<{col: number, row: number}> | null} 경로 좌표의 배열 또는 null
     */
    findPath(startCoords, endCoords) {
        const path = [];
        let currentCol = startCoords.col;
        let currentRow = startCoords.row;

        while (Math.abs(currentCol - endCoords.col) + Math.abs(currentRow - endCoords.row) > 1) {
            const dx = Math.sign(endCoords.col - currentCol);
            const dy = Math.sign(endCoords.row - currentRow);

            if (dx !== 0) {
                currentCol += dx;
            } else if (dy !== 0) {
                currentRow += dy;
            }
            path.push({ col: currentCol, row: currentRow });
        }

        console.log(`[PathfinderEngine] 경로 탐색 완료:`, path);
        return path.length > 0 ? path : null;
    }
}

export default PathfinderEngine;
