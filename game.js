import { GameEngine } from './engines/GameEngine.js';

// start game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const myGame = new GameEngine();
    myGame.start();
});
