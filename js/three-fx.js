(() => {
  "use strict";

  const canvas = document.getElementById("world-canvas");
  if (!canvas || typeof window.THREE === "undefined") {
    document.body.classList.add("webgl-unavailable");
    return;
  }

  const THREE = window.THREE;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  class CinematicWorld {
    constructor(targetCanvas) {
      this.canvas = targetCanvas;
      this.currentScene = 0;
      this.time = 0;
      this.running = true;
      this.pointer = new THREE.Vector2(0, 0);
      this.pointerTarget = new THREE.Vector2(0, 0);
      this.choiceMode = "shortcut";
      this.curveMode = "rise";
      this.curveMix = 0;
      this.curveTargetMix = 0;
      this.curvePositions = null;
      this.curveRisePositions = null;
      this.curveFallPositions = null;

      this.state = {
        orb: 1,
        curve: 0,
        fragments: .08,
        rings: .32,
        grid: .05,
        warmth: .7,
        cameraZ: 10,
        rootX: 1.8,
        rootY: 0
      };
      this.target = { ...this.state };

      this.sceneStates = [
        { orb: 1, curve: 0, fragments: .08, rings: .34, grid: .04, warmth: .92, cameraZ: 9.4, rootX: 2.15, rootY: -.05, curveMix: 0 },
        { orb: .62, curve: .04, fragments: .28, rings: .5, grid: .04, warmth: .76, cameraZ: 10, rootX: 2.35, rootY: -.1, curveMix: .1 },
        { orb: .32, curve: .38, fragments: .12, rings: .12, grid: .11, warmth: .72, cameraZ: 10.5, rootX: 2.2, rootY: -.55, curveMix: 0 },
        { orb: .15, curve: .04, fragments: .1, rings: .06, grid: .08, warmth: .38, cameraZ: 10.8, rootX: 2.8, rootY: -.3, curveMix: 1 },
        { orb: .28, curve: .72, fragments: .1, rings: .2, grid: .1, warmth: .42, cameraZ: 10.5, rootX: 2.45, rootY: -.2, curveMix: 1 },
        { orb: .4, curve: 0, fragments: .62, rings: .32, grid: .04, warmth: .4, cameraZ: 10.2, rootX: 2.7, rootY: 0, curveMix: .72 },
        { orb: .36, curve: .02, fragments: .3, rings: .52, grid: .05, warmth: .56, cameraZ: 10, rootX: 2.35, rootY: -.05, curveMix: .5 },
        { orb: .78, curve: .02, fragments: .28, rings: .76, grid: .02, warmth: .74, cameraZ: 9.6, rootX: 2.2, rootY: -.15, curveMix: .3 },
        { orb: .5, curve: .04, fragments: .28, rings: .48, grid: .03, warmth: .58, cameraZ: 9.9, rootX: -2.1, rootY: -.1, curveMix: .6 },
        { orb: .42, curve: .03, fragments: 1, rings: .84, grid: .03, warmth: .88, cameraZ: 9.8, rootX: 2.45, rootY: .1, curveMix: .2 },
        { orb: .32, curve: .08, fragments: 1, rings: .72, grid: .03, warmth: .34, cameraZ: 10.1, rootX: 2.45, rootY: .1, curveMix: .35 },
        { orb: .58, curve: .02, fragments: .52, rings: .72, grid: .04, warmth: .52, cameraZ: 9.7, rootX: 1.6, rootY: -.1, curveMix: .4 },
        { orb: .7, curve: .02, fragments: .42, rings: .82, grid: .03, warmth: .66, cameraZ: 9.6, rootX: .5, rootY: -.15, curveMix: .35 },
        { orb: .9, curve: .08, fragments: .12, rings: 1, grid: .05, warmth: .88, cameraZ: 10.4, rootX: 1.8, rootY: -.15, curveMix: .2 },
        { orb: 1.22, curve: 0, fragments: .07, rings: .78, grid: .02, warmth: 1, cameraZ: 9.2, rootX: 2.15, rootY: -.05, curveMix: 0 }
      ];

      try {
        this.initRenderer();
        this.initScene();
        this.createWorld();
        this.objects = window.PresentationObjects ? new window.PresentationObjects(this.renderer) : null;
        this.bindEvents();
        this.resize();
        this.setScene(0, true);
        this.animate();
      } catch (error) {
        console.warn("Efek WebGL dinonaktifkan:", error);
        document.body.classList.add("webgl-unavailable");
        this.dispose();
      }
    }

    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: !reducedMotion,
        powerPreference: "high-performance"
      });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, reducedMotion ? 1 : 1.5));
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.08;
    }

    initScene() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x070706, .052);
      this.camera = new THREE.PerspectiveCamera(43, 1, .1, 80);
      this.camera.position.set(0, 0, this.state.cameraZ);
      this.root = new THREE.Group();
      this.scene.add(this.root);
    }

    createWorld() {
      this.discTexture = this.createDiscTexture();
      this.createStars();
      this.createOrb();
      this.createDataCurve();
      this.createFragments();
      this.createRings();
      this.createGrid();
    }

    createDiscTexture() {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 96;
      textureCanvas.height = 96;
      const context = textureCanvas.getContext("2d");
      const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
      gradient.addColorStop(0, "rgba(255,245,204,1)");
      gradient.addColorStop(.12, "rgba(240,193,105,.92)");
      gradient.addColorStop(.42, "rgba(205,113,51,.35)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 96, 96);
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.needsUpdate = true;
      return texture;
    }

    random(seed) {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    }

    createStars() {
      const count = reducedMotion ? 360 : 920;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let index = 0; index < count; index += 1) {
        const radius = 8 + this.random(index + 2) * 20;
        const theta = this.random(index * 1.3 + 4) * Math.PI * 2;
        const phi = Math.acos(2 * this.random(index * 2.1 + 8) - 1);
        positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[index * 3 + 1] = radius * Math.cos(phi) * .65;
        positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 8;
        sizes[index] = .25 + this.random(index + 20) * .75;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      const material = new THREE.PointsMaterial({
        color: 0xcdbb98,
        size: .055,
        map: this.discTexture,
        transparent: true,
        opacity: .52,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      this.stars = new THREE.Points(geometry, material);
      this.scene.add(this.stars);
    }

    createOrb() {
      this.orbGroup = new THREE.Group();
      this.root.add(this.orbGroup);

      const shellGeometry = new THREE.IcosahedronGeometry(1.72, 3);
      const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0xd0a35a,
        wireframe: true,
        transparent: true,
        opacity: .22,
        blending: THREE.AdditiveBlending
      });
      this.orbShell = new THREE.Mesh(shellGeometry, shellMaterial);
      this.orbGroup.add(this.orbShell);

      const echoGeometry = new THREE.IcosahedronGeometry(1.98, 1);
      const echoMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b3023,
        wireframe: true,
        transparent: true,
        opacity: .14,
        blending: THREE.AdditiveBlending
      });
      this.orbEcho = new THREE.Mesh(echoGeometry, echoMaterial);
      this.orbGroup.add(this.orbEcho);

      const pointCount = reducedMotion ? 80 : 180;
      const pointPositions = new Float32Array(pointCount * 3);
      for (let index = 0; index < pointCount; index += 1) {
        const radius = .25 + this.random(index + 31) * 1.5;
        const theta = this.random(index * 2.2 + 1) * Math.PI * 2;
        const phi = Math.acos(2 * this.random(index * 3.3 + 2) - 1);
        pointPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pointPositions[index * 3 + 1] = radius * Math.cos(phi);
        pointPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      }
      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
      const pointMaterial = new THREE.PointsMaterial({
        color: 0xf0c979,
        size: .095,
        map: this.discTexture,
        transparent: true,
        opacity: .88,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.orbPoints = new THREE.Points(pointGeometry, pointMaterial);
      this.orbGroup.add(this.orbPoints);

      const coreMaterial = new THREE.SpriteMaterial({
        map: this.discTexture,
        color: 0xf0b45f,
        transparent: true,
        opacity: .82,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.coreGlow = new THREE.Sprite(coreMaterial);
      this.coreGlow.scale.set(2.9, 2.9, 1);
      this.orbGroup.add(this.coreGlow);
    }

    createDataCurve() {
      const count = 120;
      this.curvePositions = new Float32Array(count * 3);
      this.curveRisePositions = new Float32Array(count * 3);
      this.curveFallPositions = new Float32Array(count * 3);

      for (let index = 0; index < count; index += 1) {
        const t = index / (count - 1);
        const x = -7.5 + t * 15;
        const rise = -2.5 + t * 5.1 + Math.sin(t * 13) * .14;
        const peakT = .56;
        const fall = t < peakT
          ? -2.35 + (t / peakT) * 4.5 + Math.sin(t * 12) * .12
          : 2.15 - ((t - peakT) / (1 - peakT)) * 3.75 + Math.sin(t * 15) * .1;

        this.curveRisePositions.set([x, rise, 0], index * 3);
        this.curveFallPositions.set([x, fall, 0], index * 3);
        this.curvePositions.set([x, rise, 0], index * 3);
      }

      const geometry = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(this.curvePositions, 3);
      positionAttribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute("position", positionAttribute);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xe3b865,
        transparent: true,
        opacity: .9,
        blending: THREE.AdditiveBlending
      });
      this.curveLine = new THREE.Line(geometry, lineMaterial);
      this.curveLine.position.set(0, -.2, 0);
      this.root.add(this.curveLine);

      const glowMaterial = new THREE.LineBasicMaterial({
        color: 0xa4402b,
        transparent: true,
        opacity: .36,
        blending: THREE.AdditiveBlending
      });
      this.curveGlow = new THREE.Line(geometry, glowMaterial);
      this.curveGlow.position.copy(this.curveLine.position);
      this.curveGlow.scale.set(1.01, 1.03, 1);
      this.root.add(this.curveGlow);

      this.curveNodeGroup = new THREE.Group();
      for (let index = 0; index < 7; index += 1) {
        const spriteMaterial = new THREE.SpriteMaterial({
          map: this.discTexture,
          color: index === 4 ? 0xc64b33 : 0xf0c979,
          transparent: true,
          opacity: .8,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        const node = new THREE.Sprite(spriteMaterial);
        node.scale.set(.36, .36, 1);
        node.userData.t = index / 6;
        this.curveNodeGroup.add(node);
      }
      this.root.add(this.curveNodeGroup);
    }

    createFragments() {
      this.fragmentGroup = new THREE.Group();
      this.root.add(this.fragmentGroup);
      this.fragmentMaterials = [];

      const count = reducedMotion ? 18 : 42;
      for (let index = 0; index < count; index += 1) {
        const geometry = index % 3 === 0
          ? new THREE.TetrahedronGeometry(.09 + this.random(index + 9) * .18, 0)
          : new THREE.BoxGeometry(.08 + this.random(index + 4) * .2, .04 + this.random(index + 2) * .15, .04);
        const material = new THREE.MeshBasicMaterial({
          color: index % 5 === 0 ? 0x9f3d2b : 0xc9a05e,
          wireframe: index % 4 !== 0,
          transparent: true,
          opacity: .4,
          blending: THREE.AdditiveBlending
        });
        const fragment = new THREE.Mesh(geometry, material);
        const radius = 2.25 + this.random(index + 12) * 3.7;
        const angle = this.random(index * 1.7 + 3) * Math.PI * 2;
        fragment.position.set(
          Math.cos(angle) * radius,
          (this.random(index * 3.1 + 6) - .5) * 5.2,
          Math.sin(angle) * radius * .45
        );
        fragment.rotation.set(
          this.random(index + 21) * Math.PI,
          this.random(index + 41) * Math.PI,
          this.random(index + 61) * Math.PI
        );
        fragment.userData = {
          angle,
          radius,
          speed: .08 + this.random(index + 5) * .21,
          phase: this.random(index + 7) * Math.PI * 2
        };
        this.fragmentGroup.add(fragment);
        this.fragmentMaterials.push(material);
      }
    }

    createRings() {
      this.ringGroup = new THREE.Group();
      this.root.add(this.ringGroup);
      this.ringMaterials = [];
      const ringSpecs = [
        { radius: 2.4, tube: .008, color: 0xd4a55a, tilt: [1.2, .3, 0] },
        { radius: 3.15, tube: .007, color: 0x9f3d2b, tilt: [.65, .9, .2] },
        { radius: 3.85, tube: .006, color: 0xb98b4a, tilt: [1.6, -.4, .7] }
      ];

      ringSpecs.forEach((spec) => {
        const geometry = new THREE.TorusGeometry(spec.radius, spec.tube, 4, 180);
        const material = new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: .25,
          blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.set(...spec.tilt);
        this.ringGroup.add(ring);
        this.ringMaterials.push(material);
      });
    }

    createGrid() {
      this.grid = new THREE.GridHelper(24, 32, 0x8b3023, 0x5f5648);
      this.grid.position.set(0, -3.1, -2.2);
      this.grid.rotation.x = .04;
      this.grid.material.transparent = true;
      this.grid.material.opacity = .08;
      this.root.add(this.grid);
    }

    bindEvents() {
      this.onResize = () => this.resize();
      this.onPointerMove = (event) => {
        this.pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      this.onVisibility = () => {
        this.running = !document.hidden;
        if (this.running) {
          this.lastFrame = performance.now();
          requestAnimationFrame((time) => this.animate(time));
        }
      };

      window.addEventListener("resize", this.onResize, { passive: true });
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", this.onVisibility);
    }

    setScene(index, immediate = false) {
      this.currentScene = Math.max(0, Math.min(index, this.sceneStates.length - 1));
      const sceneState = this.sceneStates[this.currentScene];
      Object.assign(this.target, sceneState);
      this.curveTargetMix = sceneState.curveMix;
      if (immediate) {
        Object.assign(this.state, sceneState);
        this.curveMix = sceneState.curveMix;
      }
    }

    setProgress(progress) {
      const bounded = Math.max(0, Math.min(progress, this.sceneStates.length - 1));
      const fromIndex = Math.floor(bounded);
      const toIndex = Math.min(fromIndex + 1, this.sceneStates.length - 1);
      const rawMix = bounded - fromIndex;
      const mix = rawMix * rawMix * (3 - 2 * rawMix);
      const from = this.sceneStates[fromIndex];
      const to = this.sceneStates[toIndex];

      this.currentScene = Math.round(bounded);
      Object.keys(this.target).forEach((key) => {
        this.target[key] = THREE.MathUtils.lerp(from[key], to[key], mix);
      });
      this.curveTargetMix = THREE.MathUtils.lerp(from.curveMix, to.curveMix, mix);
    }

    setChoice(mode) {
      this.choiceMode = mode;
      if (mode === "coach") {
        this.target.warmth = 1;
        this.target.fragments = .24;
        this.target.rings = 1;
      } else {
        const defaultState = this.sceneStates[this.currentScene];
        this.target.warmth = defaultState.warmth;
        this.target.fragments = defaultState.fragments;
        this.target.rings = defaultState.rings;
      }
    }

    updateCurveGeometry() {
      if (!this.curveLine) return;
      this.curveMix = THREE.MathUtils.lerp(this.curveMix, this.curveTargetMix, .035);
      for (let index = 0; index < this.curvePositions.length; index += 1) {
        this.curvePositions[index] = THREE.MathUtils.lerp(
          this.curveRisePositions[index],
          this.curveFallPositions[index],
          this.curveMix
        );
      }
      this.curveLine.geometry.attributes.position.needsUpdate = true;

      this.curveNodeGroup.children.forEach((node) => {
        const pointIndex = Math.round(node.userData.t * 119);
        const baseIndex = pointIndex * 3;
        node.position.set(
          this.curvePositions[baseIndex],
          this.curvePositions[baseIndex + 1] - .2,
          .03
        );
      });
    }

    updateState(delta) {
      const factor = reducedMotion ? 1 : 1 - Math.pow(.001, delta);
      Object.keys(this.state).forEach((key) => {
        this.state[key] = THREE.MathUtils.lerp(this.state[key], this.target[key], factor);
      });

      this.pointer.lerp(this.pointerTarget, reducedMotion ? 1 : .035);
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, this.state.cameraZ, .035);
      this.camera.position.x = reducedMotion ? 0 : this.pointer.x * .22;
      this.camera.position.y = reducedMotion ? 0 : this.pointer.y * .14;
      this.camera.lookAt(0, 0, 0);

      this.root.position.x = THREE.MathUtils.lerp(this.root.position.x, this.state.rootX, .035);
      this.root.position.y = THREE.MathUtils.lerp(this.root.position.y, this.state.rootY, .035);

      const orbScale = Math.max(.001, this.state.orb);
      this.orbGroup.scale.setScalar(orbScale);
      this.orbGroup.visible = orbScale > .015;
      this.orbShell.material.opacity = .22 * Math.min(1, this.state.orb);
      this.orbEcho.material.opacity = .12 * Math.min(1, this.state.orb);
      this.orbPoints.material.opacity = .82 * Math.min(1, this.state.orb);
      this.coreGlow.material.opacity = .72 * Math.min(1, this.state.orb);

      const warm = this.state.warmth;
      this.orbShell.material.color.setRGB(
        .48 + warm * .35,
        .2 + warm * .38,
        .12 + warm * .16
      );
      this.orbPoints.material.color.setRGB(1, .42 + warm * .37, .18 + warm * .18);

      this.curveLine.material.opacity = .88 * this.state.curve;
      this.curveGlow.material.opacity = .34 * this.state.curve;
      this.curveLine.visible = this.state.curve > .01;
      this.curveGlow.visible = this.state.curve > .01;
      this.curveNodeGroup.visible = this.state.curve > .02;
      this.curveNodeGroup.children.forEach((node) => {
        node.material.opacity = .75 * this.state.curve;
      });

      this.fragmentMaterials.forEach((material) => {
        material.opacity = .46 * this.state.fragments;
      });
      this.fragmentGroup.visible = this.state.fragments > .01;
      this.ringMaterials.forEach((material, index) => {
        material.opacity = (.18 + index * .035) * this.state.rings;
      });
      this.grid.material.opacity = .22 * this.state.grid;
      this.grid.visible = this.state.grid > .01;
    }

    updateMotion(delta) {
      const motion = reducedMotion ? 0 : 1;
      this.time += delta * motion;

      this.orbGroup.rotation.y += delta * .12 * motion;
      this.orbGroup.rotation.x = Math.sin(this.time * .22) * .08;
      this.orbEcho.rotation.y -= delta * .18 * motion;
      this.orbPoints.rotation.z += delta * .035 * motion;
      this.coreGlow.scale.setScalar(2.75 + Math.sin(this.time * 1.4) * .13);

      this.ringGroup.children.forEach((ring, index) => {
        ring.rotation.z += delta * (.025 + index * .014) * (index % 2 ? -1 : 1) * motion;
      });
      this.ringGroup.rotation.y = this.time * .018;

      this.fragmentGroup.children.forEach((fragment, index) => {
        const data = fragment.userData;
        const angle = data.angle + this.time * data.speed;
        fragment.position.x = Math.cos(angle) * data.radius;
        fragment.position.z = Math.sin(angle) * data.radius * .48;
        fragment.position.y += Math.sin(this.time * .7 + data.phase) * .0008 * (index % 3 + 1);
        fragment.rotation.x += delta * data.speed * 1.7 * motion;
        fragment.rotation.y -= delta * data.speed * 1.2 * motion;
      });

      this.stars.rotation.y += delta * .0025 * motion;
      this.stars.rotation.z = Math.sin(this.time * .025) * .02;
    }

    renderFrame(time = performance.now()) {
      if (!this.lastFrame) this.lastFrame = time;
      const delta = Math.min((time - this.lastFrame) / 1000, .05);
      this.lastFrame = time;
      if (this.objects?.render(this.currentScene, delta, this.pointerTarget)) return;
      this.updateState(delta);
      this.updateCurveGeometry();
      this.updateMotion(delta);
      this.renderer.render(this.scene, this.camera);
    }

    animate(time) {
      if (!this.running) return;
      this.renderFrame(time);
      this.frameId = requestAnimationFrame((nextTime) => this.animate(nextTime));
    }

    resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    }

    dispose() {
      cancelAnimationFrame(this.frameId);
      window.removeEventListener("resize", this.onResize);
      window.removeEventListener("pointermove", this.onPointerMove);
      document.removeEventListener("visibilitychange", this.onVisibility);
      this.renderer?.dispose();
    }
  }

  window.CinematicWorld = CinematicWorld;
  window.cinematicWorld = new CinematicWorld(canvas);
})();
