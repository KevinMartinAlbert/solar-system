class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.stars = [];
    };

    addStar(star, position = { x: 0, y: 0, z: 0 }) {
        star.addToScene(this.scene, position);
        this.stars.push(star);
    };
};


export { SolarSystem };