import './style.css'
import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";

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

class Cube extends Mesh {
  constructor(width: number, height: number, depth: number) {
    super();

    const geometry = new BoxGeometry(width, height, depth);
    this.geometry = geometry;
    
    const material = new MeshStandardMaterial();
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

const ambientLight = new AmbientLight();
scene.add(ambientLight);

const pointLight = new PointLight();
pointLight.position.set(10,10,10);
scene.add(pointLight);




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

  cube.update();
}

animate();