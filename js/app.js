(() => {
  "use strict";

  const scenes = Array.from(document.querySelectorAll(".scene"));
  const total = scenes.length;
  const body = document.body;
  const chapterLabel = document.getElementById("chapter-label");
  const currentLabel = document.getElementById("scene-current");
  const totalLabel = document.getElementById("scene-total");
  const progressFill = document.getElementById("progress-fill");
  const previousButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const sourcesButton = document.getElementById("sources-button");
  const sourcesDialog = document.getElementById("sources-dialog");
  const sourcesClose = document.getElementById("sources-close");
  const navigationHint = document.getElementById("navigation-hint");
  const chatTopics = Array.from(document.querySelectorAll(".chat-topic"));
  const chatBody = document.getElementById("chat-body");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TRANSITION_MS = reducedMotion ? 20 : 900;
  let currentScene = 0;
  let transitionToken = 0;
  let wheelLocked = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let hintHidden = false;
  let selectedChatTopic = "flynn";
  let chatTimers = [];

  const pad = (value) => String(value).padStart(2, "0");
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function setChapter(text) {
    if (!chapterLabel || chapterLabel.textContent === text) return;
    chapterLabel.classList.add("is-changing");
    window.setTimeout(() => {
      chapterLabel.textContent = text;
      chapterLabel.classList.remove("is-changing");
    }, reducedMotion ? 0 : 160);
  }

  function updateInterface() {
    currentLabel.textContent = pad(currentScene + 1);
    totalLabel.textContent = pad(total);
    progressFill.style.width = `${((currentScene + 1) / total) * 100}%`;
    previousButton.disabled = currentScene === 0;
    nextButton.disabled = currentScene === total - 1;
    setChapter(scenes[currentScene].dataset.chapter || "");
  }

  function hideNavigationHint() {
    if (hintHidden) return;
    hintHidden = true;
    navigationHint?.classList.add("is-hidden");
  }

  function goToScene(targetIndex, options = {}) {
    const nextIndex = clamp(targetIndex, 0, total - 1);
    if (nextIndex === currentScene && !options.force) return;

    const oldScene = scenes[currentScene];
    const newScene = scenes[nextIndex];
    const token = ++transitionToken;

    if (oldScene !== newScene) {
      oldScene.classList.remove("is-active");
      oldScene.classList.add("is-exiting");
      oldScene.setAttribute("aria-hidden", "true");
    }

    newScene.classList.remove("is-exiting");
    newScene.classList.add("is-active");
    newScene.setAttribute("aria-hidden", "false");

    currentScene = nextIndex;
    body.dataset.scene = String(currentScene);
    updateInterface();
    hideNavigationHint();

    if (window.cinematicWorld?.setScene) {
      window.cinematicWorld.setScene(currentScene);
    }

    if (options.updateHash !== false) {
      history.replaceState(null, "", `#scene-${currentScene + 1}`);
    }

    window.dispatchEvent(new CustomEvent("presentation:scenechange", {
      detail: { index: currentScene, total }
    }));

    window.setTimeout(() => {
      if (token === transitionToken) {
        scenes.forEach((scene, index) => {
          if (index !== currentScene) scene.classList.remove("is-exiting");
        });
      }
    }, TRANSITION_MS);
  }

  function nextScene() {
    goToScene(currentScene + 1);
  }

  function previousScene() {
    goToScene(currentScene - 1);
  }

  function isInteractiveTarget(target) {
    return target instanceof Element && Boolean(target.closest("button, a, input, textarea, select, dialog"));
  }

  function onKeydown(event) {
    const dialogOpen = sourcesDialog?.open;
    if (dialogOpen) {
      if (event.key === "Escape") closeSources();
      return;
    }

    if (isInteractiveTarget(event.target) && !["Escape", "f", "F"].includes(event.key)) return;

    const sceneNumber = Number.parseInt(event.key, 10);
    if (Number.isInteger(sceneNumber) && sceneNumber >= 1 && sceneNumber <= total) {
      event.preventDefault();
      goToScene(sceneNumber - 1);
      return;
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        event.preventDefault();
        nextScene();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        event.preventDefault();
        previousScene();
        break;
      case "Home":
        event.preventDefault();
        goToScene(0);
        break;
      case "End":
        event.preventDefault();
        goToScene(total - 1);
        break;
      case "f":
      case "F":
        event.preventDefault();
        toggleFullscreen();
        break;
      case "s":
      case "S":
        event.preventDefault();
        openSources();
        break;
      default:
        break;
    }
  }

  function onWheel(event) {
    if (sourcesDialog?.open || wheelLocked || Math.abs(event.deltaY) < 24) return;
    wheelLocked = true;
    event.deltaY > 0 ? nextScene() : previousScene();
    window.setTimeout(() => {
      wheelLocked = false;
    }, reducedMotion ? 80 : 780);
  }

  function onTouchStart(event) {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }

  function onTouchEnd(event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const horizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const distance = horizontal ? deltaX : deltaY;
    if (Math.abs(distance) < 52) return;
    distance < 0 ? nextScene() : previousScene();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("Mode layar penuh tidak tersedia:", error);
    }
  }

  function updateFullscreenLabel() {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute("aria-label", isFullscreen ? "Keluar dari layar penuh" : "Masuk layar penuh");
    fullscreenButton.title = isFullscreen ? "Keluar layar penuh (F)" : "Layar penuh (F)";
  }

  function openSources() {
    if (!sourcesDialog) return;
    if (typeof sourcesDialog.showModal === "function") {
      if (!sourcesDialog.open) sourcesDialog.showModal();
    } else {
      sourcesDialog.setAttribute("open", "");
    }
  }

  function closeSources() {
    if (!sourcesDialog) return;
    if (typeof sourcesDialog.close === "function" && sourcesDialog.open) {
      sourcesDialog.close();
    } else {
      sourcesDialog.removeAttribute("open");
    }
  }

  function onDialogClick(event) {
    if (event.target !== sourcesDialog) return;
    const bounds = sourcesDialog.getBoundingClientRect();
    const clickedInside = (
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom
    );
    if (!clickedInside) closeSources();
  }

  const chatDialogues = {
    flynn: [
      { role: "user", text: "Apakah skor IQ seluruh dunia sedang turun?" },
      { role: "ai", text: "Belum dapat disimpulkan demikian. Penurunan ditemukan di sejumlah negara, tetapi hasilnya tidak sama di setiap tempat dan jenis tes." },
      { role: "user", text: "Apa yang ditunjukkan oleh studi Norwegia?" },
      { role: "ai emphasis", html: "Rata-rata skor meningkat sampai kelompok kelahiran 1975, kemudian menurun. Penelitian tersebut mendukung peran <strong>faktor lingkungan</strong>, tetapi tidak menetapkan satu penyebab tertentu." }
    ],
    brainrot: [
      { role: "user", text: "Apakah brainrot merupakan diagnosis medis?" },
      { role: "ai", text: "Bukan. Istilah ini digunakan secara populer untuk menggambarkan dugaan penurunan kondisi mental akibat terlalu banyak mengonsumsi konten daring yang remeh." },
      { role: "user", text: "Mengapa Balon membahasnya?" },
      { role: "ai emphasis", html: "Balon membahasnya sebagai kemungkinan dampak kebiasaan digital dan kurangnya latihan berpikir. Hubungannya dengan pembalikan Efek Flynn <strong>belum terbukti</strong>." }
    ],
    socrates: [
      { role: "user", text: "Apakah kekhawatiran terhadap teknologi sudah ada sejak dahulu?" },
      { role: "ai", text: "Ya. Dalam Phaedrus, Socrates mengkhawatirkan bahwa tulisan dapat membuat orang kurang melatih ingatan." },
      { role: "user", text: "Apakah itu berarti kekhawatiran terhadap AI pasti keliru?" },
      { role: "ai emphasis", html: "Tidak. Sejarah tidak menentukan bahwa teknologi selalu baik atau buruk. Kita tetap perlu menilai <strong>kemampuan apa yang berkurang karena jarang digunakan</strong>." }
    ]
  };

  function clearChatTimers() {
    chatTimers.forEach((timer) => window.clearTimeout(timer));
    chatTimers = [];
  }

  function playChat(topic = selectedChatTopic) {
    if (!chatBody || !chatDialogues[topic]) return;
    selectedChatTopic = topic;
    clearChatTimers();
    chatBody.replaceChildren();

    chatDialogues[topic].forEach((message, index) => {
      const addMessage = () => {
        const bubble = document.createElement("div");
        bubble.className = `chat-msg ${message.role}`;
        if (message.html) bubble.innerHTML = message.html;
        else bubble.textContent = message.text;
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      };
      if (reducedMotion) addMessage();
      else chatTimers.push(window.setTimeout(addMessage, 150 + index * 560));
    });
  }

  function selectChatTopic(selectedButton) {
    chatTopics.forEach((button) => {
      const selected = button === selectedButton;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    playChat(selectedButton.dataset.topic);
  }

  function initialSceneFromHash() {
    const match = window.location.hash.match(/^#scene-(\d+)$/);
    if (!match) return 0;
    return clamp(Number(match[1]) - 1, 0, total - 1);
  }

  previousButton.addEventListener("click", previousScene);
  nextButton.addEventListener("click", nextScene);
  fullscreenButton.addEventListener("click", toggleFullscreen);
  sourcesButton.addEventListener("click", openSources);
  sourcesClose.addEventListener("click", closeSources);
  sourcesDialog.addEventListener("click", onDialogClick);
  chatTopics.forEach((button) => button.addEventListener("click", () => selectChatTopic(button)));

  window.addEventListener("keydown", onKeydown);
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  document.addEventListener("fullscreenchange", updateFullscreenLabel);
  window.addEventListener("hashchange", () => {
    goToScene(initialSceneFromHash(), { updateHash: false });
  });
  window.addEventListener("presentation:scenechange", (event) => {
    if (event.detail.index === 4) playChat();
    else clearChatTimers();
  });

  const initialIndex = initialSceneFromHash();
  currentScene = initialIndex;
  scenes.forEach((scene, index) => {
    const active = index === initialIndex;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });
  body.dataset.scene = String(initialIndex);
  window.cinematicWorld?.setScene?.(initialIndex, true);
  updateInterface();
  updateFullscreenLabel();
  if (initialIndex === 4) playChat();

  window.setTimeout(() => navigationHint?.classList.add("is-hidden"), 8000);
  document.documentElement.classList.add("is-ready");

  window.__presentation = {
    goTo: goToScene,
    next: nextScene,
    previous: previousScene,
    get current() { return currentScene; },
    total
  };
})();
