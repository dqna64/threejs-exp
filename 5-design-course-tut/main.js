// See how there's an import statement here? This means we're
// in NodeJS land now, not vanilla JS! So this JS script can no longer be
// placed in the HTML file. It needs to be bundled first, then
// dist/main.js can be put into HTML file.
import * as THREE from 'three'

import * as dat from 'dat.gui'

const gui = new dat.GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Setup scene, camera, renderer
 */

const canvas = document.getElementById('drawingArea')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Setup objects and lighting
 */

const geometry = new THREE.SphereBufferGeometry(12, 64, 64);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./static/textures/NormalMap.png');
// console.log(normalTexture);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x222222)

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


const pointLight1Settings = gui.addFolder("PointLight 1 settings")
const light1Color = {color: 0xf545a0};

const pointLight1 = new THREE.PointLight(light1Color.color, 0.3, 25)
pointLight1.position.set(8, 10, 10);
scene.add(pointLight1)

pointLight1Settings.add(pointLight1.position, 'x').min(-20).max(20).step(0.01);
pointLight1Settings.add(pointLight1, 'intensity').min(0).max(5).step(0.01);
const pointLight1Helper = new THREE.PointLightHelper(pointLight1)
scene.add(pointLight1Helper);

pointLight1Settings.addColor(light1Color, 'color').onChange(() => {
    pointLight1.color.set(light1Color.color)
})


const pointLight2Settings = gui.addFolder("PointLight 2 settings")
const pointLight2 = new THREE.PointLight(0x367cf5, 0.7, 25)
pointLight2.position.set(-8, -10, 10);
scene.add(pointLight2)
pointLight2Settings.add(pointLight2.position, 'y').min(-20).max(20).step(0.01);
pointLight2Settings.add(pointLight2, 'intensity').min(0).max(5).step(0.01);
const pointLight2Helper = new THREE.PointLightHelper(pointLight2)
scene.add(pointLight2Helper);


/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  // elapsedTime used to update scene based on elapsed real time,
  // rather than based on each tick which may vary in real time duration.
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.4 * elapsedTime

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
