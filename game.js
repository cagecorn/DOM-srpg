import GameEngine from './GameEngine.js';
import BattleStageManager from './BattleStageManager.js';
import LayerEngine from './LayerEngine.js';

const game = new GameEngine();

game.init();

game.start();

// Set up stage background
const stageManager = new BattleStageManager('game-container');
stageManager.setupStage('assets/images/stage/battle-stage-arena.png');

// Set up layers (grid, unit, effect)
const layerEngine = new LayerEngine('game-container');
layerEngine.createGridLayer();
layerEngine.createLayer('unit', 20);
layerEngine.createLayer('effect', 30);
