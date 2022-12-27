import './style.css'
import { BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";

// ===== Scene =====
const scene = new Scene();

// ===== Camera =====
// All the default values that react-three-fiber passes to PerspectiveCamera
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;


// ===== Cube mesh =====

const cube = new Mesh();

const geometry = new BoxGeometry();
const material = new MeshStandardMaterial();

cube.geometry = geometry;
cube.material = material;

scene.add(cube);


// ===== Renderer
// react-three-fiber defaults
const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);


const container = document.querySelector<HTMLDivElement>("#app");
if (container) {
  container.appendChild(renderer.domElement);
}


// The scene, camera and renderer constitute what is automatically provided by
// the `Canvas` element in react-three-fiber


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();