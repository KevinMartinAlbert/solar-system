// import * as THREE from "three";
import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

class Star {
    constructor(type, name, radius, description, image, rotationAxis, rotationSpeed, orbitingCenter, orbitingSpeed, distanceFromOrbitingCenter, hasRings, rings, innerRadius, outerRadius, ringTexture, hasMoon, moon, moonRadius, moonTexture, moonDistanceFromOrbitingCenter, moonName, mesh, followCamera) {
        this.type = type; // can be sun, planet, moon, comet, asteroid, ...
        this.name = name; // Earth, Mars, Venus, Jupiter, Sun
        this.radius = radius; // radius of the star
        this.description = description; // description and general information about the star or celestial body
        this.image = image; // must be a square image ("../public/earth.jpg" for example)
        this.rotationAxis = rotationAxis; // axis of rotation of the planet (23.5° for the Earth, 25.19° for Mars, ...)
        this.rotationSpeed = rotationSpeed / 100000; // speed of rotation on itself (870km/h for Mars, 1670km/h for the Earth, ...)
        this.orbitingCenter = orbitingCenter; // the sun is the orbitingCenter of the earth, the earth is the orbiting center of the moon
        this.orbitingSpeed = orbitingSpeed / 1000000; // the orbiting speed of the child star around the parent star (107000km/h for the Earth around the sun, ...)
        this.distanceFromOrbitingCenter = distanceFromOrbitingCenter; // the distance between the moon and the earth, the distance between the earth and the sun ...
        this.hasRings = hasRings; // do the planet have rings, if it has, call createRingsMesh()
        this.rings = null; // a ring mesh
        this.innerRadius = innerRadius; // inner radius of the mesh
        this.outerRadius = outerRadius; // outer radius of the mesh
        this.ringTexture = null; // texture of the ring
        this.hasMoon = hasMoon; // do the planet have a moon, if it has, call createMoonMesh()
        this.moon = moon; //  a sphere mesh
        this.moonRadius = moonRadius; // radius of the moon
        this.moonTexture = moonTexture; // texture of the moon
        this.moonDistanceFromOrbitingCenter = moonDistanceFromOrbitingCenter;
        this.moonName = moonName; // name of the moon
        this.mesh = null; // a sphere mesh for the planet
        this.followCamera = null // a camera that follows the planet
    };

    createMesh(scene) {
        const geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        const texture = new THREE.TextureLoader().load(this.image);
        const material = this.type === 'sun'
            ? new THREE.MeshBasicMaterial({ map: texture })
            : new THREE.MeshStandardMaterial({ map: texture });
    
        this.mesh = new THREE.Mesh(geometry, material);
    
        if (this.hasRings) {
            this.createRingsMesh(this.innerRadius, this.outerRadius, this.ringTexture);
        }
    };

    createMoonMesh(moonRadius, moonTexture, moonDistanceFromOrbitingCenter) {
        const geometry = new THREE.SphereGeometry(moonRadius, 64, 64);
        const texture = new THREE.TextureLoader().load(moonTexture);
        const material = new THREE.MeshStandardMaterial({ map: texture });
    
        this.moon = new THREE.Mesh(geometry, material);
        this.moon.name = this.moonName;
    
        if (!this.mesh) {
            console.error(`Impossible d'ajouter la lune à ${this.name} car la planète n'existe pas.`);
            return;
        }
    
        this.moon.position.set(moonDistanceFromOrbitingCenter, 0, 0);
    
        this.mesh.add(this.moon);
    };

    createRingsMesh(innerRadius, outerRadius, ringTexture) {
        const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
        const texture = new THREE.TextureLoader().load(ringTexture);
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        });
    
        this.rings = new THREE.Mesh(geometry, material);
        this.rings.rotation.x = Math.PI / 2.2;
        this.rings.position.set(0, 0, 0);
        this.mesh.add(this.rings);
    }

    createFollowCamera(scene, offset = { x: this.radius * 5, y: 0, z: 0 }) {
        if (!this.mesh) {
            console.error(`Cannot create a follow camera for ${this.name}: mesh is not initialized.`);
            return;
        }

        const canvasElm = document.querySelector('.solar-system');
    
        this.followCamera = new THREE.PerspectiveCamera(
            45,
            canvasElm.clientWidth / canvasElm.clientHeight,
            0.1,
            1000000
        );
        this.followCamera.position.set(
            this.mesh.position.x + offset.x,
            this.mesh.position.y + offset.y,
            this.mesh.position.z + offset.z
        );
        scene.add(this.followCamera);
    };
    

    createLight(scene) {
        if(this.type === 'sun') {
            const pointLight = new THREE.PointLight(0xFFFFFF, 2, 100000000, 0)
            pointLight.position.set(0, 0, 0)
            scene.add(pointLight);
        };
        return this;
    };

    addToScene(scene, position = { x: 0, y: 0, z: 0 }) {
        if (!this.mesh) {
            this.createMesh();
        }
        this.mesh.position.set(position.x, position.y, position.z);
        scene.add(this.mesh);
    }
    

    update(deltaTime) {
        if (this.mesh) {
            this.mesh.rotation.y += this.rotationSpeed * deltaTime;

            if (this.orbitingCenter) {
                const angle = this.orbitingSpeed * deltaTime;
                const x = this.mesh.position.x * Math.cos(angle) - this.mesh.position.z * Math.sin(angle);
                const z = this.mesh.position.x * Math.sin(angle) + this.mesh.position.z * Math.cos(angle);
                this.mesh.position.set(x, this.mesh.position.y, z);
            }

            if (this.followCamera) {
                this.followCamera.position.set(
                    this.mesh.position.x + this.radius * 5,
                    this.mesh.position.y,
                    this.mesh.position.z
                );
                this.followCamera.lookAt(this.mesh.position);
            }

            if (this.moon) {
                const angle = this.orbitingSpeed * deltaTime;
                const x = this.moon.position.x * Math.cos(angle) - this.moon.position.z * Math.sin(angle);
                const z = this.moon.position.x * Math.sin(angle) + this.moon.position.z * Math.cos(angle);
                this.moon.position.set(x, this.moon.position.y, z);
            }
        }
    }
};

export { Star };
