import { LoopEngine } from './LoopEngine.js';
import { RendererEngine } from './RendererEngine.js';
import { GridEngine } from './GridEngine.js';
import { AssetLoader } from './AssetLoader.js';
import { TurnEngine } from './TurnEngine.js';

export class GameEngine {
    constructor() {
        console.log('Game Engine is booting up...');
        this.initialize();
    }

    initialize() {
        const gameBoard = document.getElementById('game-board');
        this.gridEngine = new GridEngine(20, 15);
        this.rendererEngine = new RendererEngine(gameBoard);
        this.assetLoader = new AssetLoader();
        this.turnEngine = new TurnEngine();

        this.loopEngine = new LoopEngine(
            (deltaTime) => this.update(deltaTime),
            () => this.draw()
        );
    }

    start() {
        this.gridEngine.createGrid();
        this.rendererEngine.drawGrid(this.gridEngine.getGrid());
        this.loopEngine.start();
    }

    update(deltaTime) {
        // future game logic will go here
    }

    draw() {
        // future rendering logic will go here
    }
}
