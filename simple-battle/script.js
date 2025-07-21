const units = {
    warrior: {
        id: 'warrior-unit',
        name: '워리어',
        hp: 100,
        maxHp: 100,
        attack: 15,
        element: document.getElementById('warrior-unit')
    },
    zombie: {
        id: 'zombie-unit',
        name: '좀비',
        hp: 80,
        maxHp: 80,
        attack: 10,
        element: document.getElementById('zombie-unit')
    }
};

function updateUnitUI(unit) {
    const hpPercentage = unit.hp / unit.maxHp;
    const hpBarElement = unit.element.querySelector('.hp-bar');
    hpBarElement.style.width = `${hpPercentage * 100}%`;
}

function initializeGame() {
    console.log('게임 초기화 및 UI 업데이트');
    updateUnitUI(units.warrior);
    updateUnitUI(units.zombie);

    // 디버그 매니저 호출!
    console.log("======= VFX 디버깅 시작 =======");
    debugVFX('워리어 HP 바', units.warrior.element.querySelector('.hp-bar-container'));
    debugVFX('워리어 이름표', units.warrior.element.querySelector('.name-plate'));
    debugVFX('좀비 HP 바', units.zombie.element.querySelector('.hp-bar-container'));
    debugVFX('좀비 이름표', units.zombie.element.querySelector('.name-plate'));
    console.log("==============================");
}

/**
 * [디버그 VFX 매니저]
 * 화면의 특정 요소의 위치, 크기, 레이어 정보를 콘솔에 출력합니다.
 * @param {string} elementName - 디버깅할 요소의 이름 (예: '워리어 이름표')
 * @param {HTMLElement} element - 실제 DOM 요소
 */
function debugVFX(elementName, element) {
    if (!element) {
        console.error(`[디버그 VFX]: '${elementName}' 요소를 찾을 수 없습니다.`);
        return;
    }

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    console.log(`--- [디버그 VFX]: ${elementName} ---`);
    console.log(`좌표 (x, y): ${Math.round(rect.left)}, ${Math.round(rect.top)}`);
    console.log(`크기 (너비, 높이): ${Math.round(rect.width)}, ${Math.round(rect.height)}`);
    console.log(`레이어 (z-index): ${style.zIndex}`);
    console.log('------------------------------------');
}

initializeGame();
