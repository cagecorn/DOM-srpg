export class TurnEngine {
    constructor() {
        this.currentTurn = 'PLAYER_TURN';
    }

    nextTurn() {
        if (this.currentTurn === 'PLAYER_TURN') {
            this.currentTurn = 'ENEMY_TURN';
        } else {
            this.currentTurn = 'PLAYER_TURN';
        }
        console.log(`Turn changed to: ${this.currentTurn}`);
    }
}
