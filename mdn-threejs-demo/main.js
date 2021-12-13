const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

// Create a WebGL renderer. ThreeJS offers other types of renderers
// including CSS2DRenderer, CSS2DRenderer and SVGRenderer.
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

// Create a scene: a 3D coordinate system containing
// objects to be rendered, lights and cameras.
const scene = new THREE.Scene();

// Create a camera. Placed in the scene as a rendering perspective.
// Types include PerspectiveCamera and OrthographicCamera
// Default FOV (first arg): 50
const camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 1000);
// Camera position values in 3D relative to origin. Unitless.
// Default camera position x, y, z: 0
camera.position.z = 30;
scene.add(camera);

let t = 0;

function render() {
    requestAnimationFrame(render);
    cube.rotation.set(t * Math.PI/6, t * Math.PI/6, 0);
    t += 0.01
    renderer.render(scene, camera);
}

// Create a geometry: a 3D shape
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
// Create a material: a surface appearance e.g. color, texture etc.
var basicMaterial = new THREE.MeshBasicMaterial({color: 0xd173f0})
// Bring the geometry and material together in a mesh that
// can then be placed in the scene.
var cube = new THREE.Mesh(boxGeometry, basicMaterial)
scene.add(cube);

render();
