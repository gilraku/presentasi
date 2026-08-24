/**
 * Three.js Visual Effects & Interactive 3D Ambient Engine
 * Curated for: Reversal of the Flynn Effect and Cognitive Laziness
 * Theme: Archival, Classical Renaissance Astronomy, Attention Vortex, Horizon Stardust
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is not loaded.');
    return;
  }

  // Active slide index tracker
  let currentSlide = 0;
  const scenes = [];

  /**
   * Helper to create a soft radial particle texture
   */
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(201, 160, 80, 0.9)');
    grad.addColorStop(0.6, 'rgba(201, 160, 80, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  const particleTexture = createParticleTexture();

  /* =========================================================================
     1. SLIDE 01 · 3D CELESTIAL ARMILLARY SPHERE & STARDUST
     ========================================================================= */
  function initSlide1() {
    const container = document.getElementById('s1-three-wrap');
    if (!container) return null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for armillary sphere
    const armillaryGroup = new THREE.Group();
    scene.add(armillaryGroup);

    // Gold material for rings
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xc9a050,
      transparent: true,
      opacity: 0.55,
      linewidth: 1.5
    });

    const dimRingMat = new THREE.LineBasicMaterial({
      color: 0x8e7640,
      transparent: true,
      opacity: 0.35,
      linewidth: 1
    });

    // Create concentric celestial rings
    function makeRing(radius, segments = 64, mat = ringMat) {
      const geom = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      geom.setFromPoints(points);
      return new THREE.Line(geom, mat);
    }

    // Outer horizon ring
    const rOuter = makeRing(7.5, 64, ringMat);
    armillaryGroup.add(rOuter);

    // Meridian ring (rotated 90deg X)
    const rMeridian = makeRing(7.2, 64, ringMat);
    rMeridian.rotation.x = Math.PI / 2;
    armillaryGroup.add(rMeridian);

    // Equator ring (rotated 90deg Y)
    const rEquator = makeRing(6.8, 64, dimRingMat);
    rEquator.rotation.y = Math.PI / 2;
    armillaryGroup.add(rEquator);

    // Oblique Ecliptic ring (tilted 23.5 deg)
    const rEcliptic = makeRing(6.5, 64, ringMat);
    rEcliptic.rotation.x = Math.PI / 3;
    rEcliptic.rotation.y = Math.PI / 6;
    armillaryGroup.add(rEcliptic);

    // Inner cognitive sphere ring
    const rInner = makeRing(4.2, 48, dimRingMat);
    rInner.rotation.x = -Math.PI / 4;
    armillaryGroup.add(rInner);

    // Floating Stardust Particles
    const starCount = 280;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const rad = 2 + Math.random() * 9.5;

      starPositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = rad * Math.cos(phi);
      starScales[i] = Math.random() * 0.8 + 0.3;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffe6a3,
      size: 0.35,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);

    // Mouse Parallax Interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const parentPanel = container.closest('.panel') || container;
    parentPanel.addEventListener('mousemove', (e) => {
      const rect = parentPanel.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    parentPanel.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function resize() {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function render(time) {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle continuous rotation + mouse parallax
      armillaryGroup.rotation.y = time * 0.00035 + targetX * 0.45;
      armillaryGroup.rotation.x = 0.3 + Math.sin(time * 0.0002) * 0.1 - targetY * 0.35;
      armillaryGroup.rotation.z = Math.cos(time * 0.00025) * 0.08;

      starPoints.rotation.y = -time * 0.00015 + targetX * 0.2;
      starPoints.rotation.x = time * 0.0001 - targetY * 0.2;

      renderer.render(scene, camera);
    }

    return { slideIndex: 0, render, resize };
  }

  /* =========================================================================
     2. SLIDE 06 · 3D ATTENTION VORTEX & NEURAL GRAVITY FIELD
     ========================================================================= */
  function initSlide6() {
    const container = document.getElementById('s6-three-wrap');
    if (!container) return null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Swarm Coordinates
    const particleCount = 1200;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);

    // Smartphone center attractor in 3D world coords (normalized from 54% x, 50.5% y)
    const phoneX = 0.8;
    const phoneY = -0.2;

    const colorGold = new THREE.Color(0xc9a050);
    const colorTeal = new THREE.Color(0x6eb4f0);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Spiral distribution around the attractor
      const radius = 0.8 + Math.pow(Math.random(), 1.8) * 11.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.5;

      positions[i * 3] = phoneX + Math.cos(angle) * radius;
      positions[i * 3 + 1] = phoneY + Math.sin(angle) * radius;
      positions[i * 3 + 2] = height;

      // Angular speed inversely related to radius (vortex physics)
      const speed = (0.006 + Math.random() * 0.008) / Math.max(0.4, radius * 0.4);
      velocities.push({
        radius: radius,
        angle: angle,
        speed: speed,
        zSpeed: (Math.random() - 0.5) * 0.005,
        baseY: phoneY,
        baseX: phoneX
      });

      // Color variation (inner gold/white, outer ethereal blue/gold)
      const c = (radius < 3.5) ? colorGold.clone().lerp(colorWhite, Math.random() * 0.6) : colorGold.clone().lerp(colorTeal, Math.random() * 0.4);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.42,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geom, mat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const parentPanel = container.closest('.panel') || container;
    parentPanel.addEventListener('mousemove', (e) => {
      const rect = parentPanel.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    parentPanel.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function resize() {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function render(time) {
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      const pos = geom.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const v = velocities[i];
        v.angle += v.speed * (1 + Math.abs(targetX) * 0.8);
        v.radius -= 0.003; // Slowly collapse inwards

        // Reset if too close to center
        if (v.radius < 0.4) {
          v.radius = 10 + Math.random() * 2.5;
        }

        pos[i * 3] = v.baseX + Math.cos(v.angle) * v.radius + targetX * 0.6;
        pos[i * 3 + 1] = v.baseY + Math.sin(v.angle) * v.radius + targetY * 0.6;
        pos[i * 3 + 2] += v.zSpeed;

        if (Math.abs(pos[i * 3 + 2]) > 3) {
          v.zSpeed = -v.zSpeed;
        }
      }

      geom.attributes.position.needsUpdate = true;

      // Slight perspective tilt
      particles.rotation.z = time * 0.0001;
      particles.rotation.x = targetY * 0.2;
      particles.rotation.y = targetX * 0.25;

      renderer.render(scene, camera);
    }

    return { slideIndex: 5, render, resize };
  }

  /* =========================================================================
     3. SLIDE 08 · HORIZON AMBIENT STARDUST & GOLDEN EMBERS
     ========================================================================= */
  function initSlide8() {
    const container = document.getElementById('s8-three-wrap');
    if (!container) return null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const emberCount = 500;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const speeds = [];

    for (let i = 0; i < emberCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      speeds.push({
        y: 0.004 + Math.random() * 0.008,
        xWobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02
      });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffd97d,
      size: 0.38,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    function resize() {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function render(time) {
      const pos = geom.attributes.position.array;

      for (let i = 0; i < emberCount; i++) {
        const s = speeds[i];
        pos[i * 3 + 1] += s.y; // Float upwards
        s.xWobble += s.wobbleSpeed;
        pos[i * 3] += Math.sin(s.xWobble) * 0.003;

        // Wrap around when exiting screen
        if (pos[i * 3 + 1] > 11) {
          pos[i * 3 + 1] = -11;
          pos[i * 3] = (Math.random() - 0.5) * 32;
        }
      }

      geom.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }

    return { slideIndex: 7, render, resize };
  }

  /* =========================================================================
     LIFECYCLE & RENDER DISPATCHER
     ========================================================================= */
  function init() {
    const s1 = initSlide1();
    if (s1) scenes.push(s1);

    const s6 = initSlide6();
    if (s6) scenes.push(s6);

    const s8 = initSlide8();
    if (s8) scenes.push(s8);

    // Listen to slide changes from presentation engine
    window.addEventListener('slidechange', (e) => {
      currentSlide = e.detail ? e.detail.index : 0;
      // Trigger resize on current scene when slide becomes visible
      scenes.forEach(s => {
        if (s.slideIndex === currentSlide) {
          s.resize();
        }
      });
    });

    // Detect active slide from DOM initially
    const activeSlideEl = document.querySelector('.slide.active');
    if (activeSlideEl) {
      const allSlides = [...document.querySelectorAll('.slide')];
      currentSlide = allSlides.indexOf(activeSlideEl);
    }

    // Window resize observer
    window.addEventListener('resize', () => {
      scenes.forEach(s => s.resize());
    });

    // Master Animation Loop (Only renders active slide's scene for 0% idle GPU load)
    function animate(time) {
      requestAnimationFrame(animate);

      for (let i = 0; i < scenes.length; i++) {
        const s = scenes[i];
        if (s.slideIndex === currentSlide) {
          s.render(time);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
