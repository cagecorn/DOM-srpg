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
}

initializeGame();
