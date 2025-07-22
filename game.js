// game.js

// --- 엔진 및 매니저 import ---
import GameEngine from './src/engine/GameEngine.js';
import BattleStageManager from './src/manager/BattleStageManager.js';
import LayerEngine from './src/engine/LayerEngine.js';
import UnitEngine from './src/engine/UnitEngine.js';
import FormationEngine from './src/engine/FormationEngine.js';
import AIManager from './src/ai/AIManager.js';
import eventEngine from './src/engine/EventEngine.js';
import VFXManager from './src/manager/VFXManager.js';
import BindingManager from './src/manager/BindingManager.js';
import DebugVFXManager from './src/manager/DebugVFXManager.js';
import TurnOrderManager from './src/manager/TurnOrderManager.js';
import TerminationManager from './src/manager/TerminationManager.js';
import CanvasEngine from './src/engine/CanvasEngine.js';
import BattleCalculationEngine from './src/engine/BattleCalculationEngine.js';
import DebugBattleCalculationManager from './src/manager/DebugBattleCalculationManager.js';
import AnimationEngine from './src/engine/AnimationEngine.js';
import DelayEngine from './src/engine/DelayEngine.js';
import CameraEngine from './src/engine/CameraEngine.js';

// --- AI 노드 import ---
import SelectorNode from './src/ai/nodes/SelectorNode.js';
import SequenceNode from './src/ai/nodes/SequenceNode.js';
import FindTargetNode from './src/ai/nodes/FindTargetNode.js';
import IsTargetInRangeNode from './src/ai/nodes/IsTargetInRangeNode.js';
import FindPathToTargetNode from './src/ai/nodes/FindPathToTargetNode.js';
import MoveToTargetNode from './src/ai/nodes/MoveToTargetNode.js';
import AttackTargetNode from './src/ai/nodes/AttackTargetNode.js';
import PathfinderEngine from './src/engine/PathfinderEngine.js';

// --- 게임 초기화 ---
const game = new GameEngine();
game.init();
game.start();

// --- 월드 컨테이너 생성 및 설정 ---
const gameContainer = document.getElementById('game-container');
const worldContainer = document.createElement('div');
worldContainer.id = 'world-container';
gameContainer.appendChild(worldContainer);

// --- 모든 엔진 및 매니저 인스턴스 생성 ---
const stageManager = new BattleStageManager('world-container'); // 'game-container' -> 'world-container'
const layerEngine = new LayerEngine('world-container');         // 'game-container' -> 'world-container'
const unitEngine = new UnitEngine();
const bindingManager = new BindingManager();
const debugVFXManager = new DebugVFXManager();
const turnOrderManager = new TurnOrderManager();
const terminationManager = new TerminationManager();
const canvasEngine = new CanvasEngine('world-container', 30); // 'game-container' -> 'world-container', z-index 명시
const battleEngine = new BattleCalculationEngine();
const debugBattleManager = new DebugBattleCalculationManager();
const animationEngine = new AnimationEngine();
const delayEngine = new DelayEngine();
const cameraEngine = new CameraEngine(gameContainer, worldContainer); // 카메라 엔진 초기화
const pathfinderEngine = new PathfinderEngine();

// --- 레이어 설정 ---
// stageManager.setupStage... 와 layerEngine... 호출 코드는 이제 worldContainer 내부에 요소를 생성합니다.
stageManager.setupStage('assets/images/stage/battle-stage-arena.png');
layerEngine.createGridLayer();
const unitLayer = layerEngine.createLayer('unit', 20);
const vfxLayer = layerEngine.createLayer('vfx', 25);
const gridLayer = layerEngine.getLayer('grid');

const formationEngine = new FormationEngine(unitLayer, gridLayer);
const vfxManager = new VFXManager(vfxLayer);

// --- 유닛 생성 및 배치 ---
const warrior = unitEngine.createUnit('class', 'warrior');
const zombie = unitEngine.createUnit('monster', 'zombie');
const allUnits = [warrior, zombie];

const warriorSprite = formationEngine.placeUnit(warrior, 'assets/images/unit/warrior.png', 1, 4);
const zombieSprite = formationEngine.placeUnit(zombie, 'assets/images/unit/zombie.png', 14, 4);

// 실제 스프라이트 DOM 요소를 유닛 데이터에 연결합니다.
warrior.spriteElement = warriorSprite;
zombie.spriteElement = zombieSprite;

const warriorVFX = vfxManager.createVFX(warrior, warriorSprite);
const zombieVFX = vfxManager.createVFX(zombie, zombieSprite);

bindingManager.bind(warrior.id, warriorSprite, warriorVFX);
bindingManager.bind(zombie.id, zombieSprite, zombieVFX);

// --- AI 설정 ---
const aiManager = new AIManager();

const findPathNode = new FindPathToTargetNode(pathfinderEngine);
const moveToNode = new MoveToTargetNode(formationEngine, animationEngine, vfxManager, bindingManager, delayEngine);
const attackNode = new AttackTargetNode(battleEngine, vfxManager, canvasEngine, debugBattleManager, delayEngine);

const warriorAI = new SelectorNode([
    new SequenceNode([
        new FindTargetNode(aiManager.targetManager, 'nearest', [zombie]),
        new SelectorNode([
            new SequenceNode([ new IsTargetInRangeNode(1), attackNode ]),
            new SequenceNode([ findPathNode, moveToNode, new IsTargetInRangeNode(1), attackNode ])
        ])
    ])
]);
aiManager.registerUnit(warrior, [zombie], warriorAI);
aiManager.unitData.get(warrior.id).blackboard.set('allUnits', allUnits);

const zombieAI = new SelectorNode([
    new SequenceNode([
        new FindTargetNode(aiManager.targetManager, 'nearest', [warrior]),
        new SelectorNode([
            new SequenceNode([ new IsTargetInRangeNode(1), attackNode ]),
            new SequenceNode([ findPathNode, moveToNode, new IsTargetInRangeNode(1), attackNode ])
        ])
    ])
]);
aiManager.registerUnit(zombie, [warrior], zombieAI);
aiManager.unitData.get(zombie.id).blackboard.set('allUnits', allUnits);

// --- 게임 루프 시작 ---
async function gameLoop() {
    console.log(`\n--- ${turnOrderManager.getCurrentTurnUnit().name}의 턴 ---`);

    await aiManager.executeTurn(turnOrderManager.getCurrentTurnUnit().id);

    if (terminationManager.isBattleOver) {
        console.log('전투가 종료되었습니다.');
        return;
    }

    turnOrderManager.nextTurn();
    await delayEngine.hold(1000);
    requestAnimationFrame(gameLoop);
}

// --- 초기화 및 게임 시작 ---
setTimeout(() => {
    vfxManager.updateAllPositions(bindingManager.getAllBindings());
    turnOrderManager.initialize(allUnits);

    eventEngine.on('battle_over', (data) => {
        alert(`전투 종료! 승리: ${data.winnerTeam}`);
    });

    console.log('\n--- 전투 시작 ---');
    requestAnimationFrame(gameLoop);
}, 200);
