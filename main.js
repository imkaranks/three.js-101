import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import "./style.css";

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight, // aspect-ratio
  0.1, // min distance
  100 // max distance
);

// scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// shape
const geometry = new THREE.SphereGeometry(1, 40, 40);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
});
// const material = new THREE.LineBasicMaterial({
//   color: "lime",
// });
const mesh = new THREE.Mesh(geometry, material);
// const mesh = new THREE.LineSegments(geometry, material);

scene.add(mesh);

camera.position.z = 5;

// light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 2, 2);
scene.add(light);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

let mouseDown = false,
  rgb = [12, 23, 55];

window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255),
      Math.round((e.pageY / window.innerHeight) * 255),
      150,
    ];

    const [r, g, b] = new THREE.Color(`rgb(${rgb.join(",")})`);

    gsap.to(mesh.material.color, { r, g, b });
  }
});
