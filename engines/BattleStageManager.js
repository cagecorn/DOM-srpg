export class BattleStageManager {
    constructor() {
        this.currentStage = null;
    }

    loadStage(stageData) {
        this.currentStage = stageData;
        console.log(`Stage loaded: ${this.currentStage.name}`);
    }

    getBackgroundImage() {
        return this.currentStage ? this.currentStage.backgroundImage : null;
    }
}
