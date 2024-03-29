const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(WIDTH, HEIGHT)
renderer.setClearColor(0xEEEEEE, 1)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT);
camera.position.z = 50;
scene.add(camera);

const cylinderGeometry = new THREE.CylinderGeometry(10, 7, 12);
// Instead of using a material provided by ThreeJS,
// here we use a custom-made shader for the appearance of this object.
// const basicMaterial = new THREE.MeshBasicMaterial({color: 0x3b478a});
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
})
const cylinder = new THREE.Mesh(cylinderGeometry, shaderMaterial);
scene.add(cylinder);
cylinder.rotation.set(Math.PI/6, 0, Math.PI/6);

// const ambientLight = THREE.AmbientLight(0xFFFFFF);
// scene.add(ambientLight);

function render() {
    renderer.render(scene,camera);
    window.requestAnimationFrame(render);
}

render();