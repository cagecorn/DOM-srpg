// Updated import paths to reflect new project structure
import GameEngine from './src/engine/GameEngine.js';
import BattleStageManager from './src/manager/BattleStageManager.js';
import LayerEngine from './src/engine/LayerEngine.js';

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
