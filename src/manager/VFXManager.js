// src/manager/VFXManager.js

class VFXManager {
    constructor(vfxLayer) {
        this.vfxLayer = vfxLayer;
    }

    createVFX(unit, unitSpriteElement) {
        const vfxContainer = document.createElement('div');
        vfxContainer.className = 'vfx-container';
        vfxContainer.dataset.unitId = unit.id;

        const namePlate = document.createElement('div');
        namePlate.className = 'name-plate';
        namePlate.textContent = unit.name;

        const hpBarContainer = document.createElement('div');
        hpBarContainer.className = 'hp-bar-container';
        const hpBar = document.createElement('div');
        hpBar.className = 'hp-bar';
        hpBar.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
        hpBarContainer.appendChild(hpBar);

        const typeClass = unit.type === 'class' ? 'ally' : 'enemy';
        namePlate.classList.add(typeClass);
        hpBarContainer.classList.add(typeClass);

        vfxContainer.appendChild(hpBarContainer);
        vfxContainer.appendChild(namePlate);

        this.vfxLayer.appendChild(vfxContainer);

        return vfxContainer;
    }

    /**
     * 특정 유닛의 VFX 위치를 해당 스프라이트에 맞게 업데이트합니다.
     * @param {HTMLElement} vfxElement - 업데이트할 VFX 컨테이너 요소
     * @param {HTMLElement} spriteElement - 기준이 될 스프라이트 요소
     */
    updatePosition(vfxElement, spriteElement) {
        const spriteRect = spriteElement.getBoundingClientRect();
        const containerRect = this.vfxLayer.getBoundingClientRect();

        vfxElement.style.position = 'absolute';
        vfxElement.style.left = `${spriteRect.left - containerRect.left}px`;
        vfxElement.style.top = `${spriteRect.top - containerRect.top}px`;
        vfxElement.style.width = `${spriteRect.width}px`;
        vfxElement.style.height = `${spriteRect.height}px`;
    }

    /**
     * 모든 유닛의 VFX 위치를 해당 스프라이트에 맞게 업데이트합니다.
     * @param {Map<number, object>} bindings - { unitId: { sprite, vfx } } 형태의 맵
     */
    updateAllPositions(bindings) {
        bindings.forEach(binding => {
            this.updatePosition(binding.vfx, binding.sprite);
        });
    }

    /**
     * 특정 유닛의 HP 바를 업데이트합니다.
     * @param {number} unitId - 유닛 ID
     * @param {number} currentHp - 현재 HP
     * @param {number} maxHp - 최대 HP
     */
    updateHpBar(unitId, currentHp, maxHp) {
        const vfxContainer = this.vfxLayer.querySelector(`.vfx-container[data-unit-id="${unitId}"]`);
        if (vfxContainer) {
            const hpBar = vfxContainer.querySelector('.hp-bar');
            const percentage = Math.max(0, (currentHp / maxHp) * 100);
            hpBar.style.width = `${percentage}%`;
        }
    }
}

export default VFXManager;
