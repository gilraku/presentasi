/* Ready-made Kenney meshes; camera/composition only are authored here. */
(() => {
  "use strict";
  const T = window.THREE;
  if (!T || !T.OBJLoader || !T.MTLLoader || !window.PRESENTATION_MODELS) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  class PresentationObjects {
    constructor(renderer) {
      this.renderer = renderer;
      this.ready = false;
      this.index = -1;
      this.elapsed = 0;
      this.pointer = new T.Vector2();
      this.scene = new T.Scene();
      this.camera = new T.PerspectiveCamera(36, 1, .1, 50);
      this.camera.position.set(0, .3, 8.7);
      this.scene.add(new T.HemisphereLight(0xfff6df, 0x283643, 1.25));
      const key = new T.DirectionalLight(0xffe6bd, 1.9);
      key.position.set(-3, 5, 6);
      this.scene.add(key);
      const rim = new T.DirectionalLight(0xabcddd, 1.1);
      rim.position.set(4, 2, -2);
      this.scene.add(rim);
      this.groups = new Map();
      try {
        this.models = Object.fromEntries(Object.entries(window.PRESENTATION_MODELS).map(([name, data]) => {
          const materials = new T.MTLLoader().parse(data.mtl, "");
          const object = new T.OBJLoader().setMaterials(materials).parse(data.obj);
          object.traverse(mesh => {
            if (!mesh.isMesh) return;
            const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            const converted = list.map(source => {
              // A common ink/ivory/gold palette keeps all three imported models coherent.
              const color = source.color.clone();
              const spread = Math.max(color.r, color.g, color.b) - Math.min(color.r, color.g, color.b);
              if (spread > .18) color.setHex(0xc59851);
              return new T.MeshStandardMaterial({ color, roughness: .42, metalness: .16 });
            });
            mesh.material = Array.isArray(mesh.material) ? converted : converted[0];
          });
          const bounds = new T.Box3().setFromObject(object);
          object.position.sub(bounds.getCenter(new T.Vector3()));
          const centered = new T.Group();
          centered.add(object);
          const size = bounds.getSize(new T.Vector3());
          centered.scale.setScalar(1 / Math.max(size.x, size.y, size.z));
          return [name, centered];
        }));
        this.build();
        this.ready = true;
      } catch (error) {
        console.warn("Model 3D tidak tersedia; ilustrasi asli tetap digunakan.", error);
      }
    }

    model(name, width, position, rotation = [0, 0, 0]) {
      const holder = new T.Group();
      holder.add(this.models[name].clone(true));
      holder.scale.setScalar(width);
      holder.position.set(...position);
      holder.rotation.set(...rotation);
      return holder;
    }

    group(index) {
      const group = new T.Group();
      group.visible = false;
      this.groups.set(index, group);
      this.scene.add(group);
      return group;
    }

    build() {
      // Opening: a familiar tool as the visual anchor, with books in the foreground.
      const opening = this.group(0);
      opening.add(this.model("computerScreen", 2.7, [.25, .5, 0], [0, -.3, 0]));
      opening.add(this.model("computerKeyboard", 2.2, [.2, -.65, .75], [.18, -.3, 0]));
      opening.add(this.model("books", 1.25, [-1.15, -1.35, .7], [0, .35, -.12]));

      // History: a pair of museum-like exhibits; the four original text examples stay intact.
      const history = this.group(2);
      history.add(this.model("books", 1.85, [-.6, .9, .25], [0, .3, -.1]));
      history.add(this.model("computerScreen", 2.25, [.35, -.9, -.2], [0, -.35, 0]));

      // Workplace: the same actual workstation seen from a new angle, with UI panels.
      const workplace = this.group(10);
      workplace.add(this.model("computerScreen", 2.45, [.1, .4, 0], [0, -.24, 0]));
      workplace.add(this.model("computerKeyboard", 2, [.1, -.75, .7], [.2, -.24, 0]));
      this.addPanel(workplace, [-.95, 1.35, .65], -.14, "chart");
      this.addPanel(workplace, [1.05, -.05, 1], .12, "form");
    }

    addPanel(parent, position, turn, type) {
      // Functional UI geometry, not a hand-made replacement for the imported assets.
      const panel = new T.Group();
      panel.position.set(...position);
      panel.rotation.y = turn;
      const plane = (w, h, x, y, z, color) => {
        const mesh = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color, side: T.DoubleSide }));
        mesh.position.set(x, y, z);
        panel.add(mesh);
      };
      plane(1.4, .94, 0, 0, 0, 0x26343d);
      plane(.98, .04, -.06, .29, .01, 0xecc989);
      if (type === "chart") {
        [.18, .27, .39, .31, .46].forEach((h, i) => plane(.12, h, -.43 + i * .21, -.3 + h / 2, .015, 0xcda45f));
      } else {
        [0, -.17, -.34].forEach(y => {
          plane(.08, .08, -.46, y + .1, .015, 0xcda45f);
          plane(.67, .035, .02, y + .1, .015, 0xc8d0cf);
        });
      }
      parent.add(panel);
    }

    render(index, delta, pointer) {
      const active = this.ready && this.groups.has(index) && window.innerWidth >= 1100;
      document.body.classList.toggle("object-stage-active", active);
      if (!active) { this.index = -1; return false; }
      if (this.index !== index) {
        this.index = index;
        this.elapsed = 0;
        this.groups.forEach((group, key) => { group.visible = key === index; });
      }
      this.elapsed += delta;
      this.pointer.lerp(pointer, reduced ? 1 : 1 - Math.exp(-delta * 4));
      const progress = reduced ? 1 : Math.min(this.elapsed / 1.15, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const group = this.groups.get(index);
      group.rotation.y = (1 - ease) * -.22 + (reduced ? 0 : this.pointer.x * .045);
      group.position.y = (1 - ease) * -.3;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const left = Math.floor(width * .56);
      const viewportWidth = Math.floor(width * .43);
      const bottom = Math.floor(height * .14);
      const viewportHeight = Math.floor(height * .73);
      this.camera.aspect = viewportWidth / viewportHeight;
      this.camera.position.z = 8.7 + (1 - ease) * .7;
      this.camera.position.y = .25 + (reduced ? 0 : this.pointer.y * .07);
      this.camera.lookAt(0, 0, 0);
      this.camera.updateProjectionMatrix();
      this.renderer.setViewport(0, 0, width, height);
      this.renderer.clear();
      this.renderer.setViewport(left, bottom, viewportWidth, viewportHeight);
      this.renderer.render(this.scene, this.camera);
      this.renderer.setViewport(0, 0, width, height);
      return true;
    }
  }
  window.PresentationObjects = PresentationObjects;
})();
