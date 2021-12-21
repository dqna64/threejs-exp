let renderer, scene, camera, spaghetti;

let width, height;

function init() {

    width = window.innerWidth;
    height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const geometry = new THREE.TorusKnotGeometry(10, 2, 63, 8, 9, 20);

    const material = new THREE.MeshPhongMaterial({color: 0xf0b732});

    spaghetti = new THREE.Mesh(geometry, material);
    scene.add(spaghetti);

    camera.position.z = 20;
}

init();