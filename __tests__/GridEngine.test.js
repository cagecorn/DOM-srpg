import GridEngine from '../src/engine/GridEngine.js';

describe('GridEngine', () => {
  test('gridToPixel converts grid coordinates to pixel coordinates', () => {
    const grid = new GridEngine(32, 32, 10, 10);
    const { x, y } = grid.gridToPixel(2, 3);
    expect(x).toBe(64);
    expect(y).toBe(96);
  });

  test('pixelToGrid converts pixel coordinates to grid coordinates', () => {
    const grid = new GridEngine(32, 32, 10, 10);
    const { col, row } = grid.pixelToGrid(70, 90);
    expect(col).toBe(2);
    expect(row).toBe(2);
  });

  test('setTileData stores data at specified coordinate', () => {
    const grid = new GridEngine(32, 32, 5, 5);
    grid.setTileData(1, 1, 'A');
    expect(grid.gridData[1][1]).toBe('A');
  });

  test('isValidCoordinate checks bounds correctly', () => {
    const grid = new GridEngine(32, 32, 5, 5);
    expect(grid.isValidCoordinate(4, 4)).toBe(true);
    expect(grid.isValidCoordinate(-1, 0)).toBe(false);
    expect(grid.isValidCoordinate(5, 5)).toBe(false);
  });
});
