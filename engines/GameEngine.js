import { LoopEngine } from './LoopEngine.js';
import { LayerEngine } from './LayerEngine.js';
import { RendererEngine } from './RendererEngine.js';
import { GridEngine } from './GridEngine.js';
import { AssetLoader } from './AssetLoader.js';
import { BattleStageManager } from './BattleStageManager.js';

export class GameEngine {
    constructor() {
        console.log("Game Engine is booting up...");
        this.initialize();
    }

    initialize() {
        const gameBoard = document.getElementById('game-board');

        this.layerEngine = new LayerEngine(gameBoard);
        this.rendererEngine = new RendererEngine(this.layerEngine);
        this.gridEngine = new GridEngine(16, 9);
        this.assetLoader = new AssetLoader();
        this.stageManager = new BattleStageManager();

        this.loopEngine = new LoopEngine(
            (deltaTime) => this.update(deltaTime),
            () => this.draw()
        );
    }

    async start() {
        this.layerEngine.initialize();

        this.assetLoader.loadImage('stageArena', 'assets/images/stage/battle-stage-arena.png');
        await this.assetLoader.loadAll();
        console.log("All assets loaded!");

        this.stageManager.loadStage({
            name: 'Arena',
            backgroundImage: 'stageArena'
        });

        const bgImage = this.assetLoader.getImage(this.stageManager.getBackgroundImage());
        this.rendererEngine.drawBackgroundImage(bgImage);

        this.gridEngine.createGrid();
        this.rendererEngine.drawGrid(this.gridEngine.getGrid());

        this.loopEngine.start();
    }

    update(deltaTime) {
        // (업데이트 로직)
    }

    draw() {
        // (그리기 로직)
    }
}
