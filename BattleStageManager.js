// BattleStageManager.js

class BattleStageManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    // 지정된 배경 이미지로 스테이지를 설정합니다.
    setupStage(imageUrl) {
        if (!this.container) {
            console.error("Stage container not found!");
            return;
        }
        this.container.style.backgroundImage = `url(${imageUrl})`;
        this.container.style.backgroundSize = 'cover';
        this.container.style.backgroundPosition = 'center';
        
        console.log(`Stage background set to: ${imageUrl}`);
    }

    // 스테이지 배경 이미지를 제거합니다.
    clearStage() {
        if (!this.container) {
            console.error("Stage container not found!");
            return;
        }
        this.container.style.backgroundImage = 'none';
        console.log("Stage background cleared.");
    }
}

export default BattleStageManager;
