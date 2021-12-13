const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

// Create a WebGL renderer. ThreeJS offers other types of renderers
// including CSS2DRenderer, CSS2DRenderer and SVGRenderer.
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x222222, 1);
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
camera.position.z = 50;
scene.add(camera);

let t = 0;

function render() {
    requestAnimationFrame(render);
    cube.rotation.set(t * Math.PI/6, t * Math.PI/6, 0);
    torusScale = Math.abs(Math.sin(t))
    torus.rotation.set(t * Math.PI/6, t * Math.PI/6, 0);
    torus.scale.set(torusScale, torusScale, torusScale)
    dodecahedron.rotation.set(t * Math.PI/6, t * Math.PI/6, 0);
    dodecahedron.position.y = 7 * Math.sin(t)
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
cube.position.x = -25;
scene.add(cube);

var torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
var phongMaterial = new THREE.MeshPhongMaterial({color: 0x78baf0});
var torus = new THREE.Mesh(torusGeometry, phongMaterial);
scene.add(torus);

var dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
var lambertMaterial = new THREE.MeshLambertMaterial({color: 0x80ed9b});
var dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 25;
scene.add(dodecahedron);


// Types of light: point, ambient, directional, hemisphere, spot

let ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

let spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(100, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(-80, 0, 0);
scene.add(pointLight);


render();
