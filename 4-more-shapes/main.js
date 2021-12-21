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


}

init();