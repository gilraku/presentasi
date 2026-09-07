(() => {
  "use strict";
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const total = scenes.length;
  if (!total) return;
  const previousButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const sourcesButton = document.getElementById("sources-button");
  const sourcesDialog = document.getElementById("sources-dialog");
  const sourcesClose = document.getElementById("sources-close");
  const chapterLabel = document.getElementById("chapter-label");
  const currentLabel = document.getElementById("scene-current");
  const totalLabel = document.getElementById("scene-total");
  const progressFill = document.getElementById("progress-fill");
  const navigationHint = document.getElementById("navigation-hint");
  const purposeTabs = Array.from(document.querySelectorAll("[data-purpose]"));
  let currentScene = 0;
  let wheelSum = 0;
  let lastWheel = 0;
  let wheelLockedUntil = 0;
  let touchStart = null;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  const pad = n => String(n).padStart(2, "0");
  function initialSceneFromHash() {
    const match = location.hash.match(/^#scene-(\d+)$/);
    return match ? clamp(Number(match[1]) - 1, 0, total - 1) : 0;
  }
  function goToScene(index, options = {}) {
    const next = clamp(index, 0, total - 1);
    const previousScene = scenes[currentScene];
    const focusWasInSlide = previousScene.contains(document.activeElement);
    currentScene = next;
    scenes.forEach((scene, i) => {
      const active = i === next;
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", String(!active));
      scene.inert = !active;
    });
    document.body.dataset.scene = String(next);
    chapterLabel.textContent = scenes[next].dataset.chapter;
    currentLabel.textContent = pad(next + 1);
    totalLabel.textContent = pad(total);
    progressFill.style.width = `${((next + 1) / total) * 100}%`;
    previousButton.disabled = next === 0;
    nextButton.disabled = next === total - 1;
    if (options.updateHash !== false) history.replaceState(null, "", `#scene-${next + 1}`);
    if (!options.initial) navigationHint?.classList.add("is-hidden");
    if (previousScene !== scenes[next]) {
      const content = scenes[next].querySelector(".scene__content");
      content.scrollTop = 0;
      if (focusWasInSlide) content.focus({ preventScroll: true });
    }
    window.cinematicWorld?.setScene?.(next, Boolean(options.initial));
    window.dispatchEvent(new CustomEvent("presentation:scenechange", { detail: { index: next, total } }));
  }
  function selectPurpose(tab, moveFocus = false) {
    purposeTabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      document.getElementById(button.getAttribute("aria-controls")).hidden = !selected;
    });
    if (moveFocus) tab.focus();
  }
  purposeTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectPurpose(tab));
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % purposeTabs.length;
      else if (event.key === "ArrowLeft") next = (index + purposeTabs.length - 1) % purposeTabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = purposeTabs.length - 1;
      else return;
      event.preventDefault();
      event.stopPropagation();
      selectPurpose(purposeTabs[next], true);
    });
  });
  function canScrollWithinSlide(target, direction) {
    const content = target instanceof Element ? target.closest(".scene__content") : null;
    if (!content || content.scrollHeight <= content.clientHeight + 2) return false;
    return direction > 0 ? content.scrollTop + content.clientHeight < content.scrollHeight - 2 : content.scrollTop > 2;
  }
  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
  }
  function updateFullscreenLabel() {
    const isFull = Boolean(getFullscreenElement() || document.body.classList.contains("is-pseudo-fullscreen"));
    fullscreenButton.setAttribute("aria-label", isFull ? "Keluar dari layar penuh" : "Masuk layar penuh");
    fullscreenButton.title = isFull ? "Keluar layar penuh (F)" : "Layar penuh (F)";
    const path = fullscreenButton.querySelector("path");
    if (path) {
      // Ubah ikon: panah ke dalam jika fullscreen aktif, panah ke luar jika normal
      path.setAttribute("d", isFull ? "M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4" : "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5");
    }
  }
  let fsNoticeTimeout = null;
  function showFullscreenNotice(message) {
    let toast = document.getElementById("fullscreen-notice");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fullscreen-notice";
      toast.className = "fullscreen-notice";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(fsNoticeTimeout);
    fsNoticeTimeout = setTimeout(() => toast.classList.remove("is-visible"), 4500);
  }
  async function toggleFullscreen() {
    const isFull = getFullscreenElement();
    const el = document.documentElement;
    try {
      if (isFull) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (exit) await exit.call(document);
      } else {
        const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (req) {
          await req.call(el);
        } else {
          throw new Error("Fullscreen API tidak didukung browser");
        }
      }
      document.body.classList.remove("is-pseudo-fullscreen");
    } catch (error) {
      console.warn("Layar penuh standar dibatasi browser/iframe:", error);
      document.body.classList.toggle("is-pseudo-fullscreen");
      updateFullscreenLabel();
      showFullscreenNotice("Layar penuh dibatasi jika dibuka di dalam frame preview IDE. Buka http://localhost:4173 langsung di browser Chrome/Edge, lalu tekan F.");
    }
  }
  previousButton.addEventListener("click", () => goToScene(currentScene - 1));
  nextButton.addEventListener("click", () => goToScene(currentScene + 1));
  fullscreenButton.addEventListener("click", toggleFullscreen);
  sourcesButton.addEventListener("click", () => { if (!sourcesDialog.open) sourcesDialog.showModal(); });
  sourcesClose.addEventListener("click", () => sourcesDialog.close());
  sourcesDialog.addEventListener("close", () => sourcesButton.focus());
  sourcesDialog.addEventListener("click", event => {
    if (event.target !== sourcesDialog) return;
    const r = sourcesDialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) sourcesDialog.close();
  });
  window.addEventListener("keydown", event => {
    if (sourcesDialog.open || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target instanceof Element && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
    if (event.key === " " && event.target instanceof Element && event.target.closest("button,a")) return;
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && canScrollWithinSlide(event.target, event.key === "ArrowDown" ? 1 : -1)) return;
    if (/^[1-9]$/.test(event.key)) { event.preventDefault(); goToScene(Number(event.key) - 1); return; }
    switch (event.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": event.preventDefault(); goToScene(currentScene + 1); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": event.preventDefault(); goToScene(currentScene - 1); break;
      case "Home": event.preventDefault(); goToScene(0); break;
      case "End": event.preventDefault(); goToScene(total - 1); break;
      case "f": case "F": event.preventDefault(); toggleFullscreen(); break;
      case "s": case "S": event.preventDefault(); sourcesDialog.showModal(); break;
    }
  });
  window.addEventListener("wheel", event => {
    if (sourcesDialog.open || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (canScrollWithinSlide(event.target, event.deltaY)) { wheelSum = 0; return; }
    event.preventDefault();
    const now = performance.now();
    if (now < wheelLockedUntil) { lastWheel = now; return; }
    if (now - lastWheel > 160 || Math.sign(wheelSum) !== Math.sign(event.deltaY)) wheelSum = 0;
    lastWheel = now;
    const factor = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    wheelSum += event.deltaY * factor;
    if (Math.abs(wheelSum) >= 70) {
      goToScene(currentScene + Math.sign(wheelSum));
      wheelSum = 0;
      wheelLockedUntil = now + 850;
    }
  }, { passive: false });
  window.addEventListener("touchstart", event => {
    if (sourcesDialog.open || event.touches.length !== 1) { touchStart = null; return; }
    const t = event.touches[0];
    const content = event.target instanceof Element ? event.target.closest(".scene__content") : null;
    touchStart = { x: t.clientX, y: t.clientY, target: event.target, scrollTop: content?.scrollTop || 0, content };
  }, { passive: true });
  window.addEventListener("touchend", event => {
    if (!touchStart || sourcesDialog.open || !event.changedTouches.length) return;
    const start = touchStart;
    touchStart = null;
    if (start.target instanceof Element && start.target.closest("button,a")) return;
    const t = event.changedTouches[0];
    const dx = start.x - t.clientX, dy = start.y - t.clientY;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 65) return;
    if (Math.abs(dy) >= Math.abs(dx) && (canScrollWithinSlide(start.target, dy) || Math.abs((start.content?.scrollTop || 0) - start.scrollTop) > 2)) return;
    goToScene(currentScene + Math.sign(Math.abs(dx) > Math.abs(dy) ? dx : dy));
  }, { passive: true });
  window.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });
  window.addEventListener("hashchange", () => goToScene(initialSceneFromHash(), { updateHash: false }));
  document.addEventListener("fullscreenchange", updateFullscreenLabel);
  document.addEventListener("webkitfullscreenchange", updateFullscreenLabel);
  document.addEventListener("mozfullscreenchange", updateFullscreenLabel);
  document.body.classList.add("deck-enabled");
  goToScene(initialSceneFromHash(), { initial: true, updateHash: false });
  updateFullscreenLabel();
  window.setTimeout(() => navigationHint?.classList.add("is-hidden"), 8000);
  window.__presentation = { goTo: goToScene, next: () => goToScene(currentScene + 1), previous: () => goToScene(currentScene - 1), get current() { return currentScene; }, total };
})();
