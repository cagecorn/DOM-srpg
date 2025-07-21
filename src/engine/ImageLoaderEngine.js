// ImageLoaderEngine.js

class ImageLoaderEngine {
    constructor() {
        this.imageCache = new Map();
    }

    // 이미지 URL 배열을 받아 로딩하고, 완료되면 Promise를 반환
    load(urls) {
        const promises = urls.map(url => {
            if (this.imageCache.has(url)) {
                return Promise.resolve(this.imageCache.get(url));
            }

            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.imageCache.set(url, img);
                    resolve(img);
                };
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${url}`));
                };
                img.src = url;
            });
        });

        return Promise.all(promises);
    }

    // 캐시된 이미지 가져오기
    get(url) {
        return this.imageCache.get(url);
    }
}

export default ImageLoaderEngine;
