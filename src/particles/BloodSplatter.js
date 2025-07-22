// src/particles/BloodSplatter.js

/**
 * 핏방울 파티클
 */
class BloodParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.life = 100;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.gravity = 0.1;
    }

    isAlive() {
        return this.life > 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life--;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(220,20,60,${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * 피격 위치에서 다수의 핏방울을 생성합니다.
 * @param {CanvasEngine} canvasEngine
 * @param {number} x
 * @param {number} y
 * @param {number} count
 */
export function createBloodSplatter(canvasEngine, x, y, count = 20) {
    for (let i = 0; i < count; i++) {
        canvasEngine.addParticle(new BloodParticle(x, y));
    }
}

export default BloodParticle;
