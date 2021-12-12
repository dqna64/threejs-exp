// Create a new scene; the 3D world which we manipulate
const scene = new THREE.Scene();

// Set up the camera so we can see the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Create a renderer to render the 3D scene in 2D
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Append the HTMLCanvasElement object created by the renderer
// to the DOM's HTMLBodyElement object.
document.body.appendChild(renderer.domElement);

let cube;

let loader = new THREE.TextureLoader();

loader.load( '../metal-texture.png', (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  // === A mesh typically consists of: ===
  // - a geometry (shape of the object)
  // - a material (the surface appearance of the object)
  let geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw();
});

let ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
scene.add(ambientLight);

let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set( 100, 100, 20 );
spotLight.castShadow = true;
scene.add(spotLight);

function draw() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.003;
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
}
