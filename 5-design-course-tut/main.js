// See how there's an import statement here? This means we're
// in NodeJS land now, not vanilla JS! So this JS script can no longer be
// placed in the HTML file. It needs to be bundled first, then
// dist/main.js can be put into HTML file.
import * as THREE from 'three'

// import * as dat from 'dat.gui'

// const gui = new dat.GUI();

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
camera.position.z = 30;

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
material.color = new THREE.Color(0x39afee)

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-20, -20, 40);
spotLight.castShadow = true;
scene.add(spotLight);

const pointLight = new THREE.PointLight(0xffffff, 0.1, 80)
pointLight.position.x = 3
pointLight.position.y = 4
pointLight.position.z = 20
scene.add(pointLight)

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
