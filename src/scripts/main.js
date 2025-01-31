// import * as THREE from 'three';
import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { Star } from "/src/scripts/Star.js";
import { SolarSystem } from "/src/scripts/SolarSystem.js";
import { Article } from '/src/scripts/Article.js';

const canvasElm = document.querySelector('.solar-system');
const renderer = new THREE.WebGLRenderer({ canvas: canvasElm, antialias: true });
renderer.setSize(canvasElm.clientWidth, canvasElm.clientHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    canvasElm.clientWidth / canvasElm.clientHeight,
    0.1,
    1000000
);

let orbit = new OrbitControls(camera, canvasElm);

camera.position.set(60, 80, 140);
orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    "/src/image/stars.jpg",
    "/src/image/stars.jpg",
    "/src/image/stars.jpg",
    "/src/image/stars.jpg",
    "/src/image/stars.jpg",
    "/src/image/stars.jpg"
]);


const solarSystem = new SolarSystem(scene);

fetch('/data/solar_system.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(starData => {
            const star = new Star(
                starData.type,
                starData.name,
                starData.radius,
                starData.description,
                starData.image,
                starData.rotationAxis,
                starData.rotationSpeed,
                starData.orbitingCenter,
                starData.orbitingSpeed,
                starData.distanceFromOrbitingCenter,
                starData.hasRings,
                starData.rings,
                starData.innerRadius,
                starData.outerRadius,
                starData.ringTexture,
                starData.hasMoon,
                starData.moon,
                starData.moonRadius,
                starData.moonTexture,
                starData.moonDistanceFromOrbitingCenter,
                starData.moonName
            ).createLight(scene);

            star.createMesh(scene);
            star.addToScene(scene, { x: starData.distanceFromOrbitingCenter, y: 0, z: 0 });
        
            star.createFollowCamera(scene);

            if (starData.hasRings) {
                star.createRingsMesh(starData.innerRadius, starData.outerRadius, starData.ringTexture);
            }
            
            if (starData.hasMoon) {
                star.createMoonMesh(starData.moonRadius, starData.moonTexture, starData.moonDistanceFromOrbitingCenter);
            }

            const followCam = document.getElementById(`follow_cam_${starData.name}`);
            followCam.addEventListener('click', () => {
            params.activeCamera = star.followCamera;
            orbit = new OrbitControls(params.activeCamera, canvasElm);
            orbit.update();

            const article = new Article(
                starData.name,
                starData.description,
                starData.type,
                starData.radius,
                starData.rotationAxis,
                starData.rotationSpeed,
                starData.orbitingCenter,
                starData.orbitingSpeed,
                starData.distanceFromOrbitingCenter,
            );
            Article.display(article.createArticle());
            });

            const initialCam = document.getElementById('initial_cam');
            initialCam.addEventListener('click', () => {
                params.activeCamera = camera;
            });
            

            solarSystem.addStar(star, { x: starData.distanceFromOrbitingCenter, y: 0, z: 0 });
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

const params = {
    lastTime: 0,
    refreshRate: 1 / 60,
    activeCamera: camera,
    isAnimationRunning: true,
};

const toggleAnimationButton = document.getElementById('toggle-animation');
toggleAnimationButton.addEventListener('click', () => {
    params.isAnimationRunning = !params.isAnimationRunning;
    toggleAnimationButton.textContent = params.isAnimationRunning ? 'Pause' : 'Resume';
});

// const ambientLight = new THREE.AmbientLight(0x565656, 1000);
// scene.add(ambientLight);

function animate(currentTime) {
    if (params.isAnimationRunning) {
        const deltaTime = (currentTime - params.lastTime) / 1000;
        if (deltaTime >= params.refreshRate) {
            params.lastTime = currentTime;

            solarSystem.stars.forEach(star => {
                star.update(deltaTime);
            });

            renderer.render(scene, params.activeCamera);
        };
    };
    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);


renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasElm.clientWidth, canvasElm.clientHeight);
});