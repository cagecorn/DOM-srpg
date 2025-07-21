export class AssetLoader {
    constructor() {
        this.images = {};
        this.promises = [];
    }

    loadImage(key, src) {
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[key] = img;
                console.log(`Image loaded: ${key}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                reject(`Failed to load image: ${src}`);
            };
            img.src = src;
        });
        this.promises.push(promise);
    }

    loadAll() {
        return Promise.all(this.promises);
    }

    getImage(key) {
        return this.images[key];
    }
}
