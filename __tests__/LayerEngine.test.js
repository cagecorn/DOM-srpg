// jsdom requires TextEncoder/Decoder in the global scope before it's imported
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { default: LayerEngine } = await import('../src/engine/LayerEngine.js');

describe('LayerEngine', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
  });

  test('createLayer creates a new layer with correct z-index', () => {
    const engine = new LayerEngine('container');
    const layer = engine.createLayer('unit', 5);
    expect(layer.style.zIndex).toBe('5');
    expect(layer.id).toBe('unit-layer');
    const found = document.getElementById('unit-layer');
    expect(found).toBe(layer);
  });

  test('getLayer returns existing layer', () => {
    const engine = new LayerEngine('container');
    const layer = engine.createLayer('grid', 1);
    expect(engine.getLayer('grid')).toBe(layer);
  });
});
