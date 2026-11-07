/* =====================================================================
   DECK · navegação, transições, notas, visão geral
   Não precisa editar este arquivo para mudar textos (use slides.js).
   ===================================================================== */
(function () {
  'use strict';

  const W = 1920, H = 1080;
  const data = window.SLIDES || [];
  const total = data.length;
  const Lay = window.Layouts;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, '0');

  const params = new URLSearchParams(location.search);
  const STATIC = params.has('estatico') || params.has('print');
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => STATIC || mqReduce.matches;

  const viewport = $('#viewport');
  const stage = $('#stage');
  const slidesEl = $('#slides');
  const hud = $('#hud');
  const notesEl = $('#notes');
  const overviewEl = $('#overview');
  const helpEl = $('#help');
  const blackoutEl = $('#blackout');
  const toastEl = $('#toast');

  /* ---------- montagem ---------- */
  slidesEl.innerHTML = data.map((s, i) => Lay.render(s, i, total)).join('');
  const slides = $$('.slide', slidesEl);
  $('#hud-total').textContent = pad(total);

  let current = -1;
  let trans = null;   // timeline da transição em andamento
  let live = null;    // { i, el, ctx, tl } do slide visível
  let scale = 1;

  /* ---------- escala do quadro 1920×1080 ---------- */
  function fit() {
    scale = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.setProperty('--scale', scale);
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  fit();

  /* ---------- tema (cor do fundo atrás do quadro) ---------- */
  function setTheme(i) {
    const t = data[i].tema || 'papel';
    document.body.dataset.theme = t;
    stage.dataset.theme = t;
  }

  /* ---------- HUD ---------- */
  function updateHud() {
    $('#hud-count').textContent = pad(current + 1);
    const p = total > 1 ? current / (total - 1) : 1;
    if (reduced()) gsap.set('#hud-fill', { scaleX: p });
    else gsap.to('#hud-fill', { scaleX: p, duration: 0.9, ease: 'power3.inOut', overwrite: true });
  }

  function updateHash() {
    const h = '#' + (current + 1);
    if (location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) { location.hash = h; }
    }
  }

  /* ---------- entrada de conteúdo ---------- */
  function enter(i) {
    const el = slides[i];
    const ctx = gsap.context(() => {}, el);
    let tl;
    ctx.add(() => {
      tl = gsap.timeline({ paused: true });
      Lay.animate(el, data[i], tl, { loop: !reduced() });
    });
    return { i, el, ctx, tl };
  }

  function leave(entry) {
    if (!entry) return;
    entry.ctx.revert();
    $$('.count', entry.el).forEach((c) => { c.textContent = c.dataset.final; });
  }

  function cleanSlide(el) {
    el.classList.remove('is-active', 'is-leaving');
    gsap.set(el, { clearProps: 'transform,zIndex,opacity' });
    gsap.set($('.slide__shade', el), { opacity: 0 });
  }

  /* ---------- ir para um slide ---------- */
  function go(n, opts = {}) {
    n = Math.max(0, Math.min(total - 1, n | 0));
    if (n === current) return;
    if (trans) trans.progress(1);

    const from = current;
    const dir = n > from ? 1 : -1;
    const a = from >= 0 ? slides[from] : null;
    const b = slides[n];
    const prev = live;

    current = n;
    b.classList.add('is-active');
    live = enter(n);
    const entry = live;

    setTheme(n);
    updateHud();
    updateHash();
    updateNotes();
    updatePresenter();
    if (overviewOpen) markCurrentThumb();

    // sem transição: primeira abertura, modo reduzido ou salto pedido
    if (!a || reduced() || opts.instant) {
      if (a) { cleanSlide(a); leave(prev); }
      if (reduced()) {
        entry.tl.progress(1);
        if (a && !STATIC) gsap.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'none', clearProps: 'opacity' });
      } else {
        gsap.delayedCall(0.15, () => { if (live === entry) entry.tl.play(); });
      }
      return;
    }

    a.classList.add('is-leaving');
    const shadeA = $('.slide__shade', a);
    const shadeB = $('.slide__shade', b);
    trans = gsap.timeline({
      defaults: { duration: 0.95, ease: 'power4.inOut' },
      onComplete() {
        trans = null;
        cleanSlide(a);
        leave(prev);
        gsap.set(b, { clearProps: 'transform,zIndex' });
        gsap.set(shadeB, { opacity: 0 });
      },
    });

    if (dir > 0) {
      // a folha nova entra por cima, vinda da direita
      gsap.set(a, { zIndex: 1 });
      gsap.set(b, { zIndex: 2, xPercent: 100, rotation: 1.1, transformOrigin: '0% 100%' });
      trans.to(b, { xPercent: 0, rotation: 0 }, 0)
        .to(a, { xPercent: -14 }, 0)
        .to(shadeA, { opacity: 0.5, ease: 'power2.in' }, 0);
    } else {
      // a folha atual sai para a direita e revela a anterior
      gsap.set(a, { zIndex: 2, transformOrigin: '0% 100%' });
      gsap.set(b, { zIndex: 1, xPercent: -14 });
      gsap.set(shadeB, { opacity: 0.5 });
      trans.to(a, { xPercent: 100, rotation: 1.1 }, 0)
        .to(b, { xPercent: 0 }, 0)
        .to(shadeB, { opacity: 0, ease: 'power2.out' }, 0);
    }
    trans.add(() => { if (live === entry) entry.tl.play(); }, dir > 0 ? 0.55 : 0.4);
  }

  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  /* ---------- notas do apresentador ---------- */
  let notesOpen = false;
  gsap.set(notesEl, { y: 520 });

  const notesHTML = (i) => String(data[i].notas || 'Sem notas para este slide.')
    .split(/\n\s*\n/).map((p) => '<p>' + Lay.esc(p.trim()).replace(/\n/g, '<br>') + '</p>').join('');

  function updateNotes() {
    if (current < 0) return;
    $('#notes-pos').textContent = pad(current + 1) + ' / ' + pad(total);
    $('#notes-sec').textContent = data[current].secao;
    $('#notes-text').innerHTML = notesHTML(current);
    $('#notes-text').scrollTop = 0;
    const nx = data[current + 1];
    $('#notes-next').textContent = nx ? pad(current + 2) + ' · ' + nx.secao : 'Fim da apresentação';
  }

  function toggleNotes(force) {
    notesOpen = typeof force === 'boolean' ? force : !notesOpen;
    if (notesOpen) notesEl.classList.add('is-open');
    gsap.to(notesEl, {
      y: notesOpen ? 0 : 520, duration: reduced() ? 0 : 0.55, ease: notesOpen ? 'power3.out' : 'power3.in', overwrite: true,
      onComplete: () => { if (!notesOpen) notesEl.classList.remove('is-open'); },
    });
  }

  /* ---------- visão geral ---------- */
  let overviewOpen = false;
  let ovSel = 0;
  let thumbsBuilt = false;

  function buildThumbs() {
    const grid = $('#ov-grid');
    grid.innerHTML = data.map((s, i) =>
      '<div class="thumb" role="button" tabindex="0" data-i="' + i + '" aria-label="Ir para o slide ' + (i + 1) + ': ' + Lay.esc(s.secao) + '">' +
      '<span class="thumb__frame"><span class="thumb__canvas" inert>' + Lay.render(s, i, total) + '</span></span>' +
      '<span class="thumb__label"><b>' + pad(i + 1) + '</b>' + Lay.esc(s.secao) + '</span></div>').join('');
    sizeThumbs();
    thumbsBuilt = true;
  }

  function sizeThumbs() {
    const f = $('.thumb__frame', overviewEl);
    if (!f) return;
    const k = f.offsetWidth / W;
    $$('.thumb__canvas', overviewEl).forEach((c) => { c.style.transform = 'scale(' + k + ')'; });
  }

  function markCurrentThumb() {
    $$('.thumb', overviewEl).forEach((t) => t.classList.toggle('is-current', +t.dataset.i === current));
  }

  function toggleOverview(force) {
    const open = typeof force === 'boolean' ? force : !overviewOpen;
    if (open === overviewOpen) return;
    overviewOpen = open;
    if (open) {
      if (notesOpen) toggleNotes(false);
      if (!thumbsBuilt) buildThumbs();
      overviewEl.classList.add('is-open');
      sizeThumbs();
      markCurrentThumb();
      ovSel = current;
      gsap.to(overviewEl, { opacity: 1, duration: reduced() ? 0 : 0.3, ease: 'power2.out', overwrite: true });
      if (!reduced()) gsap.from($$('.thumb', overviewEl), { y: 22, opacity: 0, duration: 0.45, ease: 'power3.out', stagger: 0.018 });
      focusThumb(ovSel);
    } else {
      gsap.to(overviewEl, {
        opacity: 0, duration: reduced() ? 0 : 0.25, ease: 'power2.in', overwrite: true,
        onComplete: () => overviewEl.classList.remove('is-open'),
      });
      stage.focus({ preventScroll: true });
    }
  }

  function focusThumb(i) {
    ovSel = Math.max(0, Math.min(total - 1, i));
    const t = $('.thumb[data-i="' + ovSel + '"]', overviewEl);
    if (t) t.focus({ preventScroll: true });
  }

  overviewEl.addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (!t) return;
    toggleOverview(false);
    go(+t.dataset.i);
  });

  /* ---------- ajuda, tela preta, aviso ---------- */
  let helpOpen = false;
  function toggleHelp(force) {
    helpOpen = typeof force === 'boolean' ? force : !helpOpen;
    helpEl.classList.toggle('is-open', helpOpen);
    if (helpOpen && !reduced()) gsap.from(helpEl, { y: -16, opacity: 0, duration: 0.3, ease: 'power3.out' });
  }

  let black = false;
  function toggleBlack() {
    black = !black;
    if (black) blackoutEl.classList.add('is-on');
    gsap.to(blackoutEl, {
      opacity: black ? 1 : 0, duration: reduced() ? 0 : 0.35, overwrite: true,
      onComplete: () => { if (!black) blackoutEl.classList.remove('is-on'); },
    });
  }

  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    gsap.killTweensOf(toastEl);
    gsap.set(toastEl, { visibility: 'visible' });
    gsap.fromTo(toastEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => gsap.to(toastEl, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(toastEl, { visibility: 'hidden' }) }), 2200);
  }

  /* ---------- tela cheia ---------- */
  function toggleFullscreen() {
    const d = document, el = d.documentElement;
    const isFs = d.fullscreenElement || d.webkitFullscreenElement;
    try {
      if (!isFs) {
        const r = (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
        if (r && r.catch) r.catch(() => toast('Tela cheia bloqueada. Tente F11.'));
      } else {
        (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      }
    } catch (e) { toast('Tela cheia indisponível. Tente F11.'); }
  }

  /* ---------- janela do apresentador (tecla P) ---------- */
  let pw = null;
  let pwStart = 0;
  let pwTimer = null;

  function openPresenter() {
    if (pw && !pw.closed) { pw.focus(); return; }
    pw = window.open('', 'expediente-notas', 'width=1100,height=760');
    if (!pw) { toast('O navegador bloqueou a janela. Libere pop-ups.'); return; }
    const css = new URL('css/fonts.css', location.href).href;
    pw.document.open();
    pw.document.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Notas do apresentador</title>' +
      '<link rel="stylesheet" href="' + css + '"><style>' +
      'body{margin:0;background:#F6F2EA;color:#17140F;font-family:Newsreader,Georgia,serif;display:flex;flex-direction:column;height:100vh}' +
      'header{display:flex;align-items:baseline;gap:20px;padding:18px 28px;border-bottom:6px solid #D42A1F;font:700 18px "Courier Prime",monospace;text-transform:uppercase}' +
      '#pos{font:400 44px Anton,Impact,sans-serif}#timer{margin-left:auto;font:400 44px Anton,Impact,sans-serif}' +
      'main{flex:1;overflow:auto;padding:22px 28px;font-size:28px;line-height:1.45}main p+p{margin-top:.7em}' +
      'footer{display:flex;align-items:center;gap:14px;padding:14px 28px;border-top:2px solid #17140F;font:400 18px "Courier Prime",monospace}' +
      'footer b{font:400 24px Anton,Impact,sans-serif;text-transform:uppercase}' +
      'button{margin-left:auto;font:700 16px "Courier Prime",monospace;text-transform:uppercase;border:2px solid #17140F;background:none;padding:8px 14px;cursor:pointer}' +
      'button+button{margin-left:0}button:hover{background:#17140F;color:#F6F2EA}' +
      '</style></head><body><header><span id="pos"></span><span id="sec"></span><span id="timer">00:00</span></header>' +
      '<main id="txt"></main><footer>Próximo: <b id="nx"></b><button id="bp">‹ Anterior</button><button id="bn">Próximo ›</button></footer></body></html>');
    pw.document.close();
    pw.document.addEventListener('keydown', onKey);
    pw.document.getElementById('bp').addEventListener('click', prev);
    pw.document.getElementById('bn').addEventListener('click', next);
    pwStart = Date.now();
    clearInterval(pwTimer);
    pwTimer = setInterval(() => {
      if (!pw || pw.closed) { clearInterval(pwTimer); return; }
      const s = Math.floor((Date.now() - pwStart) / 1000);
      pw.document.getElementById('timer').textContent = pad(Math.floor(s / 60)) + ':' + pad(s % 60);
    }, 1000);
    updatePresenter();
  }

  function updatePresenter() {
    if (!pw || pw.closed || current < 0) return;
    const d = pw.document;
    d.getElementById('pos').textContent = pad(current + 1) + ' / ' + pad(total);
    d.getElementById('sec').textContent = data[current].secao;
    d.getElementById('txt').innerHTML = notesHTML(current);
    const nx = data[current + 1];
    d.getElementById('nx').textContent = nx ? pad(current + 2) + ' · ' + nx.secao : 'Fim';
  }

  /* ---------- teclado ---------- */
  let digits = '';
  let digitTimer = null;

  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;

    if (overviewOpen) {
      const cols = 6;
      const map = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
      if (map[k] != null) { e.preventDefault(); focusThumb(ovSel + map[k]); return; }
      if (k === 'Enter' || k === ' ') { e.preventDefault(); toggleOverview(false); go(ovSel); return; }
      if (k === 'Escape' || k === 'o' || k === 'O') { e.preventDefault(); toggleOverview(false); return; }
      return;
    }

    if (/^[0-9]$/.test(k)) {
      digits += k;
      clearTimeout(digitTimer);
      digitTimer = setTimeout(() => { digits = ''; }, 1600);
      toast('Ir para o slide ' + digits + ' · Enter');
      return;
    }

    switch (k) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown':
        e.preventDefault(); next(); break;
      case ' ':
        e.preventDefault(); e.shiftKey ? prev() : next(); break;
      case 'Enter':
        e.preventDefault();
        if (digits) { const n = parseInt(digits, 10) - 1; digits = ''; go(n); } else next();
        break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(total - 1); break;
      case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
      case 'n': case 'N': e.preventDefault(); toggleNotes(); break;
      case 'o': case 'O': e.preventDefault(); toggleOverview(); break;
      case 'p': case 'P': e.preventDefault(); openPresenter(); break;
      case 'b': case 'B': case '.': e.preventDefault(); toggleBlack(); break;
      case 'h': case 'H': case '?': e.preventDefault(); toggleHelp(); break;
      case 'Escape':
        if (helpOpen) toggleHelp(false);
        else if (notesOpen) toggleNotes(false);
        else if (black) toggleBlack();
        break;
      default: break;
    }
  }
  document.addEventListener('keydown', onKey);

  /* ---------- clique, toque e swipe ---------- */
  const interactive = 'a, button, input, .notes, .overview, .help, .hud__nav';
  let touch = null;
  let swiped = false;

  viewport.addEventListener('click', (e) => {
    if (swiped) { swiped = false; return; }
    if (e.target.closest(interactive)) return;
    if (helpOpen) { toggleHelp(false); return; }
    if (black) { toggleBlack(); return; }
    if (e.clientX < window.innerWidth * 0.22) prev(); else next();
  });

  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { touch = null; return; }
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!touch) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - touch.x, dy = p.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped = true;
      setTimeout(() => { swiped = false; }, 400);
      if (e.target.closest('.overview, .notes')) return;
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  $('#btn-prev').addEventListener('click', prev);
  $('#btn-next').addEventListener('click', next);
  $('#btn-notes').addEventListener('click', () => toggleNotes());
  $('#btn-ov').addEventListener('click', () => toggleOverview());
  $('#btn-fs').addEventListener('click', toggleFullscreen);
  $('#rotate-ok').addEventListener('click', (e) => { e.stopPropagation(); document.body.classList.add('rotate-dismissed'); });

  /* ---------- mouse parado: esconde cursor e botões ---------- */
  let idleTimer = null;
  function wake() {
    document.body.classList.remove('is-idle');
    hud.classList.add('show-nav');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (overviewOpen || helpOpen) return;
      document.body.classList.add('is-idle');
      hud.classList.remove('show-nav');
    }, 2600);
  }
  window.addEventListener('mousemove', wake, { passive: true });

  /* ---------- hash: abrir direto num slide (ex.: index.html#5) ---------- */
  function hashIndex() {
    const m = /^#(\d+)/.exec(location.hash);
    return m ? Math.max(0, Math.min(total - 1, parseInt(m[1], 10) - 1)) : 0;
  }
  window.addEventListener('hashchange', () => {
    const i = hashIndex();
    if (i !== current) go(i);
  });

  /* ---------- impressão: tudo no estado final ---------- */
  window.addEventListener('beforeprint', () => {
    if (trans) trans.progress(1);
    if (live) live.tl.progress(1);
  });

  window.addEventListener('resize', () => { if (overviewOpen) sizeThumbs(); });

  /* ---------- início ---------- */
  let started = false;
  function start() {
    if (started) return;
    started = true;
    stage.classList.add('is-ready');
    go(hashIndex(), { instant: true });
    if (!STATIC) {
      const hint = $('.hud__hint', hud);
      gsap.timeline({ delay: 1.2 })
        .to(hint, { opacity: 0.75, duration: 0.5 })
        .to(hint, { opacity: 0, duration: 0.6 }, '+=5');
    }
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
    setTimeout(start, 2000);
  } else {
    start();
  }

  // acesso pelo console, útil para testar
  window.Deck = { go, next, prev, get current() { return current; }, total };
})();
