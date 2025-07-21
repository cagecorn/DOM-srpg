export class AssetLoader {
    constructor() {
        this.images = {};
    }

    loadImage(key, src) {
        // placeholder for real loading logic
        console.log(`Loading image: ${key} from ${src}`);
        return Promise.resolve();
    }

    getImage(key) {
        return this.images[key];
    }
}
