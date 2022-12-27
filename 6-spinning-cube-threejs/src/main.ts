/**
 * This ThreeJS sketch demonstrates a simple project with manually setting
 * the default values that react-three-fiber uses for scene, camera
 */
import './style.css'
import { ACESFilmicToneMapping, AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, sRGBEncoding, WebGLRenderer } from "three";

// ===== Scene =====
const scene = new Scene();

// ===== Camera =====
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;

class Cube extends Mesh {
  constructor(width: number, height: number, depth: number) {
    super();

    const geometry = new BoxGeometry(width, height, depth);
    this.geometry = geometry;
    
    const material = new MeshStandardMaterial({ color: "#1e90d6"});
    this.material = material;

  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }

  dispose() {
    this.geometry.dispose();
  }
}


// ===== Scene elements =====

const cube = new Cube(2,2,2);
scene.add(cube);

const subCubeZ = new Cube(1,1,4);
cube.add(subCubeZ);

const subCubeY = new Cube(1,4,1);
cube.add(subCubeY);

const subCubeX = new Cube(4,1,1);
cube.add(subCubeX);

const ambientLight = new AmbientLight("0xffffff", 0.4);
scene.add(ambientLight);

const pointLight = new PointLight("0xffffff", 0.5);
// Not allowed to set the pointLight.position property, only allowed to mutate
// the Vector3 value because it is expensive to create and should not be created
// on each render.
pointLight.position.set(10,10,10);
scene.add(pointLight);


// ===== Renderer
// react-three-fiber defaults
const renderer = new WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputEncoding = sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);


const container = document.querySelector<HTMLDivElement>("#app");
if (container) {
  container.appendChild(renderer.domElement);
}


// The scene, camera and renderer, and the requestAnimationFrame below
// constitute what is automatically provided by the `Canvas` element in
// react-three-fiber.

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.update();
}

animate();