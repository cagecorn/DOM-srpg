// src/manager/VFXManager.js

/**
 * 유닛의 HP 바, 이름표 등 시각 효과(VFX)를 생성하고 관리합니다.
 */
class VFXManager {
    constructor(vfxLayer) {
        this.vfxLayer = vfxLayer;
    }

    /**
     * 특정 유닛을 위한 VFX 요소를 생성합니다.
     * @param {object} unit - 유닛 데이터 인스턴스
     * @param {HTMLElement} unitSpriteElement - 유닛의 스프라이트 DOM 요소
     * @returns {HTMLElement} 생성된 VFX 컨테이너 요소
     */
    createVFX(unit, unitSpriteElement) {
        const vfxContainer = document.createElement('div');
        vfxContainer.className = 'vfx-container';
        vfxContainer.dataset.unitId = unit.id;

        // 이름표 생성
        const namePlate = document.createElement('div');
        namePlate.className = 'name-plate';
        namePlate.textContent = unit.name;

        // HP 바 생성
        const hpBarContainer = document.createElement('div');
        hpBarContainer.className = 'hp-bar-container';
        const hpBar = document.createElement('div');
        hpBar.className = 'hp-bar';
        hpBar.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
        hpBarContainer.appendChild(hpBar);

        // 아군/적군에 따라 색상 클래스 추가
        const typeClass = unit.type === 'class' ? 'ally' : 'enemy';
        namePlate.classList.add(typeClass);
        hpBarContainer.classList.add(typeClass);

        // 컨테이너에 추가 (이름표는 아래, HP바는 위)
        vfxContainer.appendChild(hpBarContainer); // HP 바가 위
        vfxContainer.appendChild(namePlate);      // 이름표가 아래

        this.vfxLayer.appendChild(vfxContainer);

        return vfxContainer;
    }

    /**
     * 모든 유닛의 VFX 위치를 해당 스프라이트에 맞게 업데이트합니다.
     * @param {Map<number, object>} bindings - { unitId: { sprite, vfx } } 형태의 맵
     */
    updatePositions(bindings) {
        bindings.forEach(binding => {
            const spriteRect = binding.sprite.getBoundingClientRect();
            const containerRect = this.vfxLayer.getBoundingClientRect();

            // vfxContainer의 위치를 스프라이트 기준으로 설정
            binding.vfx.style.position = 'absolute';
            binding.vfx.style.left = `${spriteRect.left - containerRect.left}px`;
            binding.vfx.style.top = `${spriteRect.top - containerRect.top}px`;
            binding.vfx.style.width = `${spriteRect.width}px`;
            binding.vfx.style.height = `${spriteRect.height}px`;
        });
    }
}

export default VFXManager;
