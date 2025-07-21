import { GameEngine } from './engines/GameEngine.js';

window.addEventListener('DOMContentLoaded', () => {
    const myGame = new GameEngine();
    myGame.start();
});
