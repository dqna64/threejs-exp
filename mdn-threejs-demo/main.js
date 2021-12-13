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
const camera = newTHREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1, 1000);
// Camera position values in 3D relative to origin. Unitless.
// Default camera position x, y, z: 0
camera.position.z = 60;
scene.add(camera);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();
