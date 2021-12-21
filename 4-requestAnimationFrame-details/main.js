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

function draw() {
    spaghetti.rotation.x += 0.01;
    spaghetti.rotation.y += 0.01;
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(animate);
    /*
    Note: for 60fps, period is 1000ms/60frames = 16.7ms approx/

    If the window is in a background tab,
    requestAnimationFrame will either stop executing its callback or
    slow down the animation cycle frequency significantly (2 frames/sec or less).

    rAF makes a request to the browser to execute its callback on the next
    available screen repaint. rAF itself does NOT execute the callback.

    rAF before all rendering work means if a render exceeds the animation
    processing period of 16.7ms then they'll start piling up, while
    rAF after all rendering work means some renders might exceed the screen
    repaint period and cause lag, but no renders will be missed.
    (Please fact-check the above)
    */
}

init();
// Paint initial state of the scene before any updates.
requestAnimationFrame(draw());