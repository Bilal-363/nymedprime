/**
 * NY MedCare — WebGL Layer v2 (gl.js)
 * PulseLine (gl-scenes #22) in ink line-art.
 * ROTATES TO VERTICAL as the rail for the pinned process section.
 * C18 hero-lock -> C5 lateral dolly -> C7 pull-back.
 */

import * as THREE from 'three';
import { smoothScroll } from './engine.js';

(function initGL() {
  const canvas = document.getElementById('gl');
  if (!canvas) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileAspect = window.matchMedia('(max-aspect-ratio: 11/10)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;

  function fallbackToNoGL() {
    document.documentElement.classList.add('no-gl');
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) {
    fallbackToNoGL();
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    fallbackToNoGL();
    return;
  }

  renderer.setClearAlpha(0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileAspect ? 1.5 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.15, 7.40);
  const lookTarget = new THREE.Vector3(0, 0, 0);
  camera.lookAt(lookTarget);

  // Pulse Group for rotation and drift
  const pulseGroup = new THREE.Group();
  scene.add(pulseGroup);

  // ECG Waveform math
  function ecg(p) {
    const g = (c, w, a) => a * Math.exp(-Math.pow((p - c) / w, 2));
    return g(0.160, 0.030, 0.13)   // P wave
         - g(0.245, 0.010, 0.16)   // Q
         + g(0.262, 0.012, 1.00)   // R spike
         - g(0.285, 0.014, 0.30)   // S
         + g(0.440, 0.055, 0.24);  // T wave
  }

  const N = 480;
  const CYCLES = 3;
  const SPAN = 18;
  const AMP = 1.35;
  const pts = [];

  for (let i = 0; i <= N; i++) {
    const f = i / N;
    pts.push(new THREE.Vector3(-SPAN / 2 + SPAN * f, ecg((f * CYCLES) % 1) * AMP, 0));
  }
  const fullCurve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);

  // 1. Base trace tube
  const baseGeom = new THREE.TubeGeometry(fullCurve, 480, 0.018, 6, false);
  const baseMat = new THREE.MeshBasicMaterial({
    color: 0x141210,
    transparent: true,
    opacity: 0.15,
    depthWrite: false
  });
  const baseMesh = new THREE.Mesh(baseGeom, baseMat);
  pulseGroup.add(baseMesh);

  // 2. Baseline
  const baselineGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-9, 0, 0),
    new THREE.Vector3(9, 0, 0)
  ]);
  const baselineMat = new THREE.LineBasicMaterial({
    color: 0x141210,
    transparent: true,
    opacity: 0.07
  });
  const baselineMesh = new THREE.Line(baselineGeom, baselineMat);
  pulseGroup.add(baselineMesh);

  // 3. Head trace & Head dot
  let headTubeMesh = null;
  const headMat = new THREE.MeshBasicMaterial({
    color: 0x136f63,
    transparent: true,
    opacity: 0.62,
    depthWrite: false
  });

  const dotMat = new THREE.MeshBasicMaterial({
    color: 0x136f63,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });
  const dotGeom = new THREE.SphereGeometry(0.055, 12, 10);
  const headDot = new THREE.Mesh(dotGeom, dotMat);
  if (!isMobileAspect) {
    pulseGroup.add(headDot);
  }

  // Pre-allocated scratch objects
  const scratchPos = new THREE.Vector3();
  const subPts = new Array(40);
  for (let k = 0; k < 40; k++) subPts[k] = new THREE.Vector3();

  function updateHeadGeometry(headNorm) {
    const windowSamples = 40;
    const startIndex = Math.floor(headNorm * N);

    for (let k = 0; k < windowSamples; k++) {
      const idx = (startIndex + k) % N;
      subPts[k].copy(pts[idx]);
    }

    const subCurve = new THREE.CatmullRomCurve3(subPts, false, 'centripetal', 0.5);
    const newHeadGeom = new THREE.TubeGeometry(subCurve, 64, 0.026, 6, false);

    if (headTubeMesh) {
      headTubeMesh.geometry.dispose();
      headTubeMesh.geometry = newHeadGeom;
    } else {
      headTubeMesh = new THREE.Mesh(newHeadGeom, headMat);
      pulseGroup.add(headTubeMesh);
    }

    if (!isMobileAspect && headDot) {
      fullCurve.getPoint(headNorm, scratchPos);
      headDot.position.copy(scratchPos);
    }
  }

  // Parallax cursor
  let targetPx = 0, targetPy = 0;
  let currPx = 0, currPy = 0;

  if (hasHover) {
    window.addEventListener('mousemove', (e) => {
      targetPx = (e.clientX / window.innerWidth) * 2 - 1;
      targetPy = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
  }

  // Camera Keyframe Rig for v2
  function getCameraKeyframes() {
    const GL = window.GL || {};
    const pt = GL.processTop || 2500;
    const pl = GL.processLen || 2000;
    const proofTop = GL.proofTop || 5000;
    const ctaTop = GL.ctaTop || 7000;

    return [
      { s: 0,            p: [0, 0.15, 7.40],      t: [0, 0.00, 0], fov: 34 },
      { s: 1400,         p: [0, 0.28, 7.70],      t: [0, 0.02, 0], fov: 34 },
      { s: pt,           p: [-1.60, 0.40, 8.20],  t: [0, 0.05, 0], fov: 35 }, // C5 dolly starts
      { s: pt + pl,      p: [1.60, 0.40, 8.20],   t: [0, 0.05, 0], fov: 35 }, // C5 dolly ends
      { s: proofTop,     p: [0, 0.46, 8.80],      t: [0, 0.04, 0], fov: 36 },
      { s: ctaTop + 200, p: [0, 0.62, 12.80],     t: [0, 0.00, 0], fov: 42 }  // C7 pull-back
    ];
  }

  function interpolateCamera(s) {
    const kfs = getCameraKeyframes();
    let lower = kfs[0];
    let upper = kfs[kfs.length - 1];

    for (let i = 0; i < kfs.length - 1; i++) {
      if (s >= kfs[i].s && s <= kfs[i + 1].s) {
        lower = kfs[i];
        upper = kfs[i + 1];
        break;
      }
    }

    const span = upper.s - lower.s;
    const factor = span > 0 ? THREE.MathUtils.clamp((s - lower.s) / span, 0, 1) : 0;
    const eased = factor * factor * (3 - 2 * factor); // smoothstep

    const px = THREE.MathUtils.lerp(lower.p[0], upper.p[0], eased);
    const py = THREE.MathUtils.lerp(lower.p[1], upper.p[1], eased);
    const pz = THREE.MathUtils.lerp(lower.p[2], upper.p[2], eased);

    const tx = THREE.MathUtils.lerp(lower.t[0], upper.t[0], eased);
    const ty = THREE.MathUtils.lerp(lower.t[1], upper.t[1], eased);
    const tz = THREE.MathUtils.lerp(lower.t[2], upper.t[2], eased);

    const fov = THREE.MathUtils.lerp(lower.fov, upper.fov, eased);

    return { pos: [px, py, pz], target: [tx, ty, tz], fov };
  }

  // Tier 3: Reduced motion
  if (isReducedMotion) {
    updateHeadGeometry(0.262); // park on R spike
    camera.position.set(0, 0.15, 7.40);
    lookTarget.set(0, 0, 0);
    camera.lookAt(lookTarget);
    renderer.render(scene, camera);
    return;
  }

  // Animation & Rendering Loop
  const clock = new THREE.Clock();
  let lastHeadUpdate = 0;
  const HEAD_UPDATE_INTERVAL = 1 / 30; // 30 fps cap

  function renderFrame() {
    if (document.hidden) {
      requestAnimationFrame(renderFrame);
      return;
    }

    const t = clock.getElapsedTime();
    const s = window.smoothScroll || smoothScroll || window.scrollY || 0;
    const GL = window.GL || {};

    // Travelling head
    const headNorm = (t / 2.4) % 1;
    if (t - lastHeadUpdate >= HEAD_UPDATE_INTERVAL) {
      updateHeadGeometry(headNorm);
      lastHeadUpdate = t;
    }

    // v2: Rail Rotation tied to S7 horizontal pinned process!
    if (GL.processLen && GL.processLen > 0) {
      const pProcess = THREE.MathUtils.clamp((s - (GL.processTop || 0)) / GL.processLen, 0, 1);
      pulseGroup.rotation.z = pProcess * Math.PI * 0.5; // 0 -> 90 degrees
      pulseGroup.position.x = -0.9 + pProcess * 1.8;   // drifts with panels
    }

    // Pointer smoothing
    currPx += (targetPx - currPx) * 0.055;
    currPy += (targetPy - currPy) * 0.055;

    // Camera state
    const camState = interpolateCamera(s);
    camera.fov = camState.fov;
    camera.updateProjectionMatrix();

    camera.position.set(camState.pos[0], camState.pos[1], camState.pos[2]);

    // Drift
    camera.position.y += Math.sin(t * 0.22) * 0.060;
    camera.position.x += Math.sin(t * 0.145) * 0.045;

    // Parallax
    if (hasHover) {
      camera.position.x += currPx * 0.16;
      camera.position.y += currPy * 0.10;
    }

    lookTarget.set(camState.target[0], camState.target[1], camState.target[2]);
    camera.lookAt(lookTarget);

    renderer.render(scene, camera);
    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileAspect ? 1.5 : 1.75));
  }, { passive: true });
})();
