/**
 * Presentation Controller & Interactive Engine
 * Reversal of the Flynn Effect and Cognitive Laziness
 * Richard Balon, MD (Annals of Clinical Psychiatry · 2026)
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  const btns = [...document.querySelectorAll('.nav button')];

  // Trivia Modal Elements
  const triviaModal = document.getElementById('triviaModal');
  const btnTrivia = document.getElementById('btnTrivia');
  const btnCloseTrivia = document.getElementById('btnCloseTrivia');
  const tmTabs = [...document.querySelectorAll('.tm-tab')];
  const tmViews = {
    pillars: document.getElementById('view-pillars'),
    timeline: document.getElementById('view-timeline'),
    matrix: document.getElementById('view-matrix')
  };

  let current = 0;

  // Master Slide Navigation Function
  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === current && slides[current].classList.contains('active')) return;
    
    slides[current].classList.remove('active');
    if (btns[current]) btns[current].classList.remove('active');
    
    current = n;
    
    // Trigger DOM reflow to re-trigger CSS animations on slide entrance
    void slides[current].offsetWidth;
    
    slides[current].classList.add('active');
    if (btns[current]) btns[current].classList.add('active');
    
    const countEl = document.getElementById('count');
    if (countEl) countEl.textContent = String(current + 1).padStart(2, '0') + ' / 08';

    const progEl = document.getElementById('progress');
    if (progEl) progEl.style.width = ((current + 1) / slides.length * 100) + '%';

    // Dispatch global event for Three.js engine and other listeners
    window.dispatchEvent(new CustomEvent('slidechange', { detail: { index: current } }));

    // If landing on slide 5 (AI & Cognition), trigger smooth initial dialogue
    if (current === 4) {
      playChatDialogue('science');
    }
  }

  // Bind navigation buttons if present
  btns.forEach(b => {
    b.onclick = () => go(+b.dataset.i);
  });

  // Click on slide count indicator to go forward (or loop back to start)
  const countEl = document.getElementById('count');
  if (countEl) {
    countEl.style.cursor = 'pointer';
    countEl.onclick = () => {
      go(current < slides.length - 1 ? current + 1 : 0);
    };
  }

  // Scientific Trivia Modal Controls & Sub-Tabs
  function toggleTrivia(open) {
    if (open === undefined) {
      triviaModal.classList.toggle('open');
    } else if (open) {
      triviaModal.classList.add('open');
    } else {
      triviaModal.classList.remove('open');
    }
  }

  if (btnTrivia) btnTrivia.onclick = () => toggleTrivia(true);
  if (btnCloseTrivia) btnCloseTrivia.onclick = () => toggleTrivia(false);

  tmTabs.forEach(tab => {
    tab.onclick = () => {
      tmTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.view;
      Object.keys(tmViews).forEach(k => {
        if (tmViews[k]) {
          if (k === target) {
            tmViews[k].classList.add('active');
          } else {
            tmViews[k].classList.remove('active');
          }
        }
      });
    };
  });

  // Keyboard Navigation
  document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    
    if (key === 't' || key === 'i') {
      e.preventDefault();
      toggleTrivia();
      return;
    }
    if (e.key === 'Escape') {
      toggleTrivia(false);
      return;
    }
    if (triviaModal && triviaModal.classList.contains('open')) return;

    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      go(current + 1);
    }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      go(current - 1);
    }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  });

  // Touch Navigation for Tablets and Mobile
  let touchStartY = 0, touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (triviaModal && triviaModal.classList.contains('open')) return;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      go(current + (diffX > 0 ? 1 : -1));
    } else if (Math.abs(diffY) > 50) {
      go(current + (diffY > 0 ? 1 : -1));
    }
  }, { passive: true });

  // Mobile Tap Support for SVG Data Nodes (Slide 03)
  const nodeGroups = [...document.querySelectorAll('.node-group')];
  nodeGroups.forEach(node => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = node.classList.contains('active');
      nodeGroups.forEach(n => n.classList.remove('active'));
      if (!isActive) node.classList.add('active');
    });
  });
  document.addEventListener('click', () => {
    nodeGroups.forEach(n => n.classList.remove('active'));
  });

  // Interactive AI Sandbox Engine (Natural Turn-Taking Dialogue)
  const chatData = {
    science: [
      { type: 'user', text: 'Jelaskan kenapa air mendidih pada suhu 100°C di permukaan laut.' },
      { type: 'ai', small: 'AI RESPONSE', text: 'Karena pada tekanan 1 atm, tekanan uap air sama dengan tekanan udara sekitar. Tapi sekadar membaca rumus ini belum tentu sama dengan paham cara kerjanya.' },
      { type: 'user', text: 'Berarti setelah baca ini, aku belum tentu benar-benar paham?' },
      { type: 'ai', isEmphasis: true, small: 'AI REFLECTION', text: 'Belum tentu. Kamu baru memegang <strong>jawabannya</strong>. Pemahaman yang asli baru terbentuk saat kamu bisa menjelaskannya dengan kata-katamu sendiri.' }
    ],
    cognition: [
      { type: 'user', text: 'Apa bedanya tahu sebuah fakta dengan benar-benar memahaminya?' },
      { type: 'ai', small: 'AI RESPONSE', text: 'Tahu fakta adalah rekaman memori instan (seperti mencari di mesin pencari). Memahami adalah kemampuan menghubungkan konsep dan menerapkannya pada masalah baru.' },
      { type: 'user', text: 'Kenapa menyerahkan semua jawaban ke AI bisa membuat pikiran lelah?' },
      { type: 'ai', isEmphasis: true, small: 'AI REFLECTION', text: 'Karena otot kognitif hanya terlatih saat otak mengalami <strong>kesulitan produktif</strong>—proses berpikir mandiri sebelum mendapatkan kesimpulan.' }
    ],
    philosophy: [
      { type: 'user', text: 'Apakah kekhawatiran terhadap teknologi kemudahan ini hal baru dalam sejarah?' },
      { type: 'ai', small: 'AI RESPONSE', text: '2.400 tahun lalu, filsuf Socrates mengkritik penemuan tulisan karena dianggap membuat manusia berhenti melatih daya ingatnya sendiri.' },
      { type: 'user', text: 'Lalu apa bedanya era tulisan kuno dengan era AI sekarang?' },
      { type: 'ai', isEmphasis: true, small: 'AI REFLECTION', text: 'Tulisan bersifat pasif merekam. AI bersifat <strong>generatif aktif</strong>—ia mampu menyusun kesimpulan menggantikan kita jika kita tidak berhati-hati.' }
    ]
  };

  const pChips = [...document.querySelectorAll('.p-chip')];
  const chatBody = document.getElementById('chatBody');
  const typingBubble = document.getElementById('typingBubble');
  let chatTimeouts = [];

  function clearChatTimeouts() {
    chatTimeouts.forEach(t => clearTimeout(t));
    chatTimeouts = [];
  }

  function playChatDialogue(topic) {
    const dialog = chatData[topic];
    if (!dialog || !chatBody) return;

    clearChatTimeouts();
    chatBody.innerHTML = '';

    // Step 1: User message 1 appears
    const u1 = createChatMsg(dialog[0]);
    chatBody.appendChild(u1);
    setTimeout(() => u1.classList.add('show'), 40);

    // Step 2: Show typing bubble for AI
    chatTimeouts.push(setTimeout(() => {
      if (typingBubble) {
        typingBubble.style.display = 'block';
        chatBody.appendChild(typingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 400));

    // Step 3: AI response 1 appears
    chatTimeouts.push(setTimeout(() => {
      if (typingBubble) typingBubble.style.display = 'none';
      const a1 = createChatMsg(dialog[1]);
      chatBody.appendChild(a1);
      setTimeout(() => a1.classList.add('show'), 40);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1400));

    // Step 4: User follow-up message 2 appears
    chatTimeouts.push(setTimeout(() => {
      const u2 = createChatMsg(dialog[2]);
      chatBody.appendChild(u2);
      setTimeout(() => u2.classList.add('show'), 40);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 2500));

    // Step 5: Show typing bubble for final AI reflection
    chatTimeouts.push(setTimeout(() => {
      if (typingBubble) {
        typingBubble.style.display = 'block';
        chatBody.appendChild(typingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 3200));

    // Step 6: Final AI reflection message appears
    chatTimeouts.push(setTimeout(() => {
      if (typingBubble) typingBubble.style.display = 'none';
      const a2 = createChatMsg(dialog[3]);
      chatBody.appendChild(a2);
      setTimeout(() => a2.classList.add('show'), 40);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 4400));
  }

  function createChatMsg(msg) {
    const div = document.createElement('div');
    div.className = `chat-msg ${msg.type} ${msg.isEmphasis ? 'emphasis' : ''}`;
    
    if (msg.small) {
      const small = document.createElement('small');
      small.textContent = msg.small;
      div.appendChild(small);
    }
    
    const span = document.createElement('span');
    span.innerHTML = msg.text;
    div.appendChild(span);
    
    return div;
  }

  pChips.forEach(chip => {
    chip.onclick = () => {
      pChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      playChatDialogue(chip.dataset.topic);
    };
  });

  // Initialize on load
  playChatDialogue('science');
});
