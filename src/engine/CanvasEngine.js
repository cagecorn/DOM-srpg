// src/engine/CanvasEngine.js

/**
 * 파티클 등 캔버스 기반 효과를 관리합니다.
 */
class CanvasEngine {
    constructor(containerId, zIndex = 30) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];

        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = zIndex;

        this.container.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    /**
     * 새로운 파티클을 추가합니다.
     * @param {object} particle
     */
    addParticle(particle) {
        this.particles.push(particle);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(p => p.isAlive());
        this.particles.forEach(p => {
            p.update();
            p.draw(this.ctx);
        });
        requestAnimationFrame(this.animate.bind(this));
    }
}

export default CanvasEngine;
