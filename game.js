// game.js
// ... (기존 import 구문들)
import GameEngine from './src/engine/GameEngine.js';
import BattleStageManager from './src/manager/BattleStageManager.js';
import LayerEngine from './src/engine/LayerEngine.js';

// 새로 만든 엔진과 매니저들을 import 합니다.
import UnitEngine from './src/engine/UnitEngine.js';
import FormationEngine from './src/engine/FormationEngine.js';
import AIManager from './src/ai/AIManager.js';
import eventEngine from './src/engine/EventEngine.js';

// VFX 및 바인딩 관련 매니저들
import VFXManager from './src/manager/VFXManager.js';
import BindingManager from './src/manager/BindingManager.js';
import DebugVFXManager from './src/manager/DebugVFXManager.js';

// --- 게임 초기화 및 시작 ---
const game = new GameEngine();
game.init();
game.start();

// --- 매니저 및 엔진 인스턴스 생성 ---
const stageManager = new BattleStageManager('game-container');
const layerEngine = new LayerEngine('game-container');
const unitEngine = new UnitEngine();
const aiManager = new AIManager();
const bindingManager = new BindingManager();
const debugVFXManager = new DebugVFXManager();

// --- 스테이지 및 레이어 설정 ---
stageManager.setupStage('assets/images/stage/battle-stage-arena.png');
layerEngine.createGridLayer();
const unitLayer = layerEngine.createLayer('unit', 20);
const vfxLayer = layerEngine.createLayer('vfx', 25);
const gridLayer = layerEngine.getLayer('grid');

const vfxManager = new VFXManager(vfxLayer);

// --- 포메이션 엔진을 사용하여 유닛 배치 ---
const formationEngine = new FormationEngine(unitLayer, gridLayer);

// 유닛 생성
const warrior = unitEngine.createUnit('class', 'warrior');
const zombie = unitEngine.createUnit('monster', 'zombie');

// AI 등록 시 적군 목록을 함께 넘겨줍니다.
if (warrior) {
    const warriorSprite = formationEngine.placeUnit(warrior, 'assets/images/unit/warrior.png', 1, 4);
    const warriorVFX = vfxManager.createVFX(warrior, warriorSprite);
    bindingManager.bind(warrior.id, warriorSprite, warriorVFX);
}

if (zombie) {
    const zombieSprite = formationEngine.placeUnit(zombie, 'assets/images/unit/zombie.png', 14, 4);
    const zombieVFX = vfxManager.createVFX(zombie, zombieSprite);
    bindingManager.bind(zombie.id, zombieSprite, zombieVFX);
}

if (warrior && zombie) {
    aiManager.registerUnit(warrior, [zombie]);
    aiManager.registerUnit(zombie, [warrior]);
}

// 유닛이 배치된 후 VFX 위치를 동기화하고 좌표를 확인합니다.
setTimeout(() => {
    vfxManager.updatePositions(bindingManager.getAllBindings());

    const warriorBinding = bindingManager.getBinding(warrior.id);
    if (warriorBinding) {
        debugVFXManager.log(`${warrior.name} VFX`, warriorBinding.vfx);
    }
    const zombieBinding = bindingManager.getBinding(zombie.id);
    if (zombieBinding) {
        debugVFXManager.log(`${zombie.name} VFX`, zombieBinding.vfx);
    }
}, 100);

// (예시) 이벤트 리스너 등록
eventEngine.on('unitAttacked', (data) => {
    console.log(`%c[Event] ${data.attacker.name}이(가) ${data.target.name}을(를) 공격했습니다!`, "color: orange; font-weight: bold;");
    // 이벤트를 받아서 UI에 데미지를 표시하거나, 유닛의 HP를 깎는 로직을 여기에 추가할 수 있습니다.
});

// --- (예시) 턴 실행 ---
console.log("\n--- 전투 시작 ---");
if (warrior) {
    aiManager.executeTurn(warrior.id); // 워리어 턴 실행
}
if (zombie) {
    aiManager.executeTurn(zombie.id); // 좀비 턴 실행
}
