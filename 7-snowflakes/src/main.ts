/**
 * This ThreeJS sketch demonstrates a simple project with manually setting
 * the default values that react-three-fiber uses for scene, camera
 */
import './style.css'
import { ACESFilmicToneMapping, AmbientLight, BoxGeometry, BufferGeometry, Color, Line, LineBasicMaterial, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, sRGBEncoding, TetrahedronGeometry, Vector3, WebGLRenderer } from "three";

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

class Tetrahedron extends Mesh {
  constructor(radius: number, initPosition: { x: number, y: number, z: number }, initRotation: { x: number, y: number, z: number }) {
    super();

    const geometry = new TetrahedronGeometry(radius);
    this.geometry = geometry;

    const material = new MeshStandardMaterial({ color: "#1e90d6" });
    this.material = material;

    this.position.set(initPosition.x, initPosition.y, initPosition.z)
    this.rotation.x = initRotation.x
    this.rotation.y = initRotation.y
    this.rotation.z = initRotation.z

  }

  update() {
    // this.rotation.x -= 0.001;
    // console.log(this.rotation.x);

    // this.rotation.y += 0.01;
  }

  dispose() {
    this.geometry.dispose();
  }
}


// ===== Scene elements =====

const baseTetrahedron = new Tetrahedron(1, { x: 0, y: 0, z: 0 }, { x: - Math.PI / 4, y: 0, z: Math.PI / 4 })
scene.add(baseTetrahedron);

const subTetrahedron1 = new Tetrahedron(0.5, { x: 0, y: -1, z: 0 }, { x: - Math.PI / 4, y: 0, z: Math.PI / 4 })
scene.add(subTetrahedron1);

const ambientLight = new AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new PointLight(0xffffff, 0.5);
// Not allowed to set the pointLight.position property, only allowed to mutate
// the Vector3 value because it is expensive to create and should not be created
// on each render or whenever unnecessary.
pointLight.position.set(10, 10, 10);
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

  baseTetrahedron.update();
}

animate();