export class LayerEngine {
    constructor(containerElement) {
        this.container = containerElement;
        this.layers = {};
        this.layerOrder = ['background', 'grid', 'units', 'effects', 'ui'];
    }

    initialize() {
        this.layerOrder.forEach(layerName => {
            const layerElement = document.createElement('div');
            layerElement.id = `${layerName}-layer`;
            layerElement.className = 'layer';
            this.container.appendChild(layerElement);
            this.layers[layerName] = layerElement;
        });
        console.log('All layers initialized.');
    }

    getLayer(name) {
        return this.layers[name];
    }
}
