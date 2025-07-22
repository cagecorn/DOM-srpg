// src/manager/BindingManager.js

/**
 * 유닛의 스프라이트와 VFX 요소를 서로 '바인딩'(연결)하여 관리합니다.
 */
class BindingManager {
    constructor() {
        // key: unitId, value: { sprite: HTMLElement, vfx: HTMLElement }
        this.bindings = new Map();
    }

    /**
     * 유닛의 스프라이트와 VFX를 바인딩합니다.
     * @param {number} unitId - 유닛의 고유 ID
     * @param {HTMLElement} spriteElement - 유닛 스프라이트 요소
     * @param {HTMLElement} vfxElement - 유닛 VFX 컨테이너 요소
     */
    bind(unitId, spriteElement, vfxElement) {
        this.bindings.set(unitId, {
            sprite: spriteElement,
            vfx: vfxElement,
        });
        console.log(`[BindingManager] Unit ID ${unitId}의 스프라이트와 VFX가 바인딩되었습니다.`);
    }

    /**
     * 특정 유닛의 바인딩 정보를 가져옵니다.
     * @param {number} unitId - 유닛 ID
     * @returns {object | undefined} 바인딩된 요소 객체
     */
    getBinding(unitId) {
        return this.bindings.get(unitId);
    }

    /**
     * 모든 바인딩 정보를 가져옵니다.
     * @returns {Map} 전체 바인딩 맵
     */
    getAllBindings() {
        return this.bindings;
    }
}

export default BindingManager;
