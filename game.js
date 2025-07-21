// game.js

// 기존 import 구문들
import GameEngine from './src/engine/GameEngine.js';
import BattleStageManager from './src/manager/BattleStageManager.js';
import LayerEngine from './src/engine/LayerEngine.js';

// 새로 만든 엔진과 매니저들을 import 합니다.
import UnitEngine from './src/engine/UnitEngine.js';
import FormationEngine from './src/engine/FormationEngine.js';

// --- 게임 초기화 및 시작 ---
const game = new GameEngine();
game.init();
game.start();

// --- 매니저 및 엔진 인스턴스 생성 ---
const stageManager = new BattleStageManager('game-container');
const layerEngine = new LayerEngine('game-container');
const unitEngine = new UnitEngine();

// --- 스테이지 및 레이어 설정 ---
stageManager.setupStage('assets/images/stage/battle-stage-arena.png');
layerEngine.createGridLayer();
const unitLayer = layerEngine.createLayer('unit', 20);
const gridLayer = layerEngine.getLayer('grid');
layerEngine.createLayer('effect', 30);

// --- 포메이션 엔진을 사용하여 유닛 배치 ---
const formationEngine = new FormationEngine(unitLayer, gridLayer);

// 1. 워리어 유닛 인스턴스 생성
const warrior = unitEngine.createUnit('class', 'warrior');
if (warrior) {
    // 2. 워리어를 그리드 왼편에 배치 (예: 2번째 열, 5번째 행)
    formationEngine.placeUnit(warrior, 'assets/images/unit/warrior.png', 1, 4);
}

// 3. 좀비 유닛 인스턴스 생성
const zombie = unitEngine.createUnit('monster', 'zombie');
if (zombie) {
    // 4. 좀비를 그리드 오른편에 배치 (예: 15번째 열, 5번째 행)
    formationEngine.placeUnit(zombie, 'assets/images/unit/zombie.png', 14, 4);
}
