/* =====================================================================
   LAYOUTS
   Cada layout tem render() (gera o HTML do slide a partir de slides.js)
   e animate() (coreografia GSAP de entrada). O estado final de tudo é o
   próprio CSS: as animações só usam "from", então miniaturas, impressão
   e modo sem animação mostram o slide completo.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- utilidades ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const UL_PATH = 'M2 13 C 34 6, 70 17, 104 10 S 168 5, 198 11';

  // uma passada só: o HTML gerado nunca é relido pelas outras regras.
  // Marca-texto e risco são aplicados palavra por palavra para poderem quebrar linha.
  function md(s) {
    return esc(s).replace(/(==|~~|__|\*\*)(.+?)\1/g, (m, tag, inner) => {
      if (tag === '**') return '<strong>' + inner + '</strong>';
      if (tag === '__') {
        return '<span class="mk mk--ul"><span class="mk__tx">' + inner + '</span>' +
          '<svg class="mk__svg" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + UL_PATH + '"/></svg></span>';
      }
      const hl = tag === '==';
      return '<span class="mk mk--' + (hl ? 'hl' : 'st') + '">' + inner.split(' ').map((w) => hl
        ? '<span class="mk__w"><span class="mk__bg"></span><span class="mk__tx">' + w + '</span></span>'
        : '<span class="mk__w"><span class="mk__tx">' + w + '</span><span class="mk__line"></span></span>'
      ).join(' ') + '</span>';
    }).replace(/\n/g, '<br>');
  }

  const lines = (arr) => (Array.isArray(arr) ? arr : [arr])
    .map((l) => '<span class="ln"><span class="ln__in">' + md(l) + '</span></span>').join('');

  const fmt = (v, d) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

  const count = (v, d = 0, pre = '', suf = '') => {
    const txt = esc(pre) + fmt(v, d) + esc(suf);
    return '<span class="count" data-to="' + v + '" data-dec="' + d + '" data-pre="' + esc(pre) + '" data-suf="' +
      esc(suf) + '" data-final="' + txt + '">' + txt + '</span>';
  };

  const pad = (n) => String(n).padStart(2, '0');

  // gerador pseudoaleatório com semente: o "feito à mão" sai sempre igual
  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  // borda rasgada (clip-path) nas laterais e/ou embaixo
  function torn(seed, { sides = 'lr', ax = 1.4, ay = 2.5, n = 10 } = {}) {
    const r = rng(seed);
    const p = [];
    const f = (v) => v.toFixed(2) + '%';
    p.push('0% 0%', '100% 0%');
    if (sides.includes('r')) for (let i = 1; i < n; i++) p.push(f(100 - r() * ax) + ' ' + f(i * 100 / n));
    if (sides.includes('b')) {
      p.push('100% 100%');
      const teeth = n * 3;
      for (let i = teeth - 1; i > 0; i--) p.push(f(i * 100 / teeth) + ' ' + f(i % 2 ? 100 - ay : 100));
      p.push('0% 100%');
    } else {
      p.push('100% 100%', '0% 100%');
    }
    if (sides.includes('l')) for (let i = n - 1; i > 0; i--) p.push(f(r() * ax) + ' ' + f(i * 100 / n));
    return 'polygon(' + p.join(',') + ')';
  }

  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const arr = (x) => (x == null ? [] : (x instanceof Element ? [x] : Array.from(x)));

  /* ---------- peças de animação reutilizáveis ---------- */
  const A = {
    lines(tl, scope, sel, at, o = {}) {
      const els = $$(sel + ' .ln__in', scope);
      // parte bem de baixo: acentos e cedilhas não podem aparecer antes da linha
      if (els.length) tl.from(els, { yPercent: 165, duration: o.d || 1.05, ease: 'expo.out', stagger: o.st || 0.09 }, at);
    },
    up(tl, els, at, o = {}) {
      els = arr(els);
      if (els.length) tl.from(els, { y: o.y == null ? 26 : o.y, opacity: 0, duration: o.d || 0.75, ease: 'power3.out', stagger: o.st || 0.08 }, at);
    },
    marks(tl, scope, at, o = {}) {
      if (!scope) return;
      $$('.mk', scope).forEach((m, k) => {
        const t = at + k * (o.st || 0.32);
        if (m.classList.contains('mk--hl')) tl.from($$('.mk__bg', m), { scaleX: 0, duration: 0.24, ease: 'power1.inOut', stagger: 0.13 }, t);
        else if (m.classList.contains('mk--st')) tl.from($$('.mk__line', m), { scaleX: 0, duration: 0.2, ease: 'power1.inOut', stagger: 0.11 }, t);
        else if (m.classList.contains('mk--ul')) tl.from($('path', m), { strokeDashoffset: 1, duration: 0.6, ease: 'power2.inOut' }, t);
      });
    },
    count(tl, els, at, o = {}) {
      arr(els).forEach((el, k) => {
        const to = parseFloat(el.dataset.to);
        const dec = +el.dataset.dec || 0;
        const pre = el.dataset.pre || '';
        const suf = el.dataset.suf || '';
        // largura fixa durante a contagem para o resto da linha não "pular"
        gsap.set(el, { minWidth: el.offsetWidth + 'px' });
        const obj = { v: 0 };
        el.textContent = pre + fmt(0, dec) + suf;
        tl.to(obj, {
          v: to, duration: o.d || 1.6, ease: o.ease || 'power2.out',
          onUpdate: () => { el.textContent = pre + fmt(obj.v, dec) + suf; },
        }, at + k * (o.st || 0));
      });
    },
    stamp(tl, el, at, slide) {
      if (!el) return;
      tl.from(el, { scale: 2.3, opacity: 0, duration: 0.34, ease: 'power4.in' }, at);
      tl.fromTo($('.slide__paper', slide), { x: 0 }, { x: 4, duration: 0.05, ease: 'none', yoyo: true, repeat: 3, immediateRender: false }, at + 0.34);
    },
  };

  /* ---------- SVGs gerados ---------- */
  function tallySVG(n) {
    const per = 40, gw = 22, gh = 30, rg = 12, sg = 4.4;
    const r = rng(1888);
    const rows = Math.ceil(Math.ceil(n / 5) / per);
    const W = per * gw, H = rows * (gh + rg) - rg;
    let left = n;
    let out = '<svg class="tally__svg" viewBox="-6 -6 ' + (W + 12) + ' ' + (H + 12) + '" aria-hidden="true">';
    for (let row = 0; row < rows; row++) {
      let d = '';
      for (let c = 0; c < per && left > 0; c++) {
        const k = Math.min(5, left);
        left -= k;
        const x0 = c * gw, y0 = row * (gh + rg);
        for (let s = 0; s < Math.min(4, k); s++) {
          d += 'M' + (x0 + 2 + s * sg + (r() - 0.5) * 1.4).toFixed(1) + ' ' + (y0 + (r() - 0.5) * 2.4).toFixed(1) +
            'l' + ((r() - 0.5) * 1.6).toFixed(1) + ' ' + (gh + (r() - 0.5) * 3).toFixed(1);
        }
        if (k === 5) {
          d += 'M' + (x0 - 1 + (r() - 0.5) * 2).toFixed(1) + ' ' + (y0 + gh * 0.8).toFixed(1) +
            'L' + (x0 + 3 * sg + 6 + (r() - 0.5) * 2).toFixed(1) + ' ' + (y0 + gh * 0.2).toFixed(1);
        }
      }
      out += '<path class="tally__row" d="' + d + '"/>';
    }
    return out + '</svg>';
  }

  function arrowHead(x1, y1, x2, y2, cls) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len, px = -uy, py = ux;
    const tip = [x2 + ux * 8, y2 + uy * 8];
    const base = [x2 - ux * 22, y2 - uy * 22];
    const pts = [tip, [base[0] + px * 15, base[1] + py * 15], [base[0] - px * 15, base[1] - py * 15]]
      .map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    return '<polygon class="pyr__head ' + cls + '" points="' + pts + '"/>';
  }

  function clockSVG() {
    const x = (h) => 24 + h * 24.5;
    let s = '<svg class="clock__svg" viewBox="0 0 640 140" aria-hidden="true">';
    s += '<rect class="clock__base" x="' + x(0) + '" y="104" width="' + (x(24) - x(0)) + '" height="4"/>';
    for (let h = 0; h <= 24; h++) {
      const big = h % 6 === 0;
      s += '<rect class="clock__tick" x="' + (x(h) - 1) + '" y="' + (big ? 82 : 92) + '" width="2" height="' + (big ? 22 : 12) + '"/>';
      if (big) s += '<text class="clock__lbl" x="' + x(h) + '" y="134" text-anchor="middle">' + h + 'h</text>';
    }
    for (let k = 0; k * 3.5 < 24; k++) {
      const h = k * 3.5;
      const lab = Math.floor(h) + 'h' + (h % 1 ? '30' : '');
      s += '<g class="clock__mark"><rect x="' + (x(h) - 4) + '" y="34" width="8" height="70"/>' +
        '<text x="' + x(h) + '" y="24" text-anchor="middle">' + lab + '</text></g>';
    }
    return s + '</svg>';
  }

  function rulerSVG() {
    const x = (a) => 20 + (a - 5) * (1688 / 13);
    let s = '<svg class="ruler__scale" viewBox="0 0 1728 74" preserveAspectRatio="none" aria-hidden="true">';
    s += '<rect x="' + x(5) + '" y="0" width="' + (x(18) - x(5)) + '" height="3"/>';
    for (let a = 5; a <= 18; a += 0.5) {
      const major = a % 1 === 0;
      s += '<rect x="' + (x(a) - 1) + '" y="0" width="2" height="' + (major ? 26 : 13) + '"/>';
      if (major) s += '<text x="' + x(a) + '" y="62" text-anchor="middle">' + a + '</text>';
    }
    return s + '</svg>';
  }

  function panopticSVG() {
    const c = 230, R1 = 148, R2 = 215, n = 24;
    const P = (r, a) => (c + r * Math.cos(a)).toFixed(1) + ' ' + (c + r * Math.sin(a)).toFixed(1);
    let s = '<svg class="pan__svg" viewBox="0 0 460 460" aria-hidden="true">';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2 + 0.03, a1 = ((i + 1) / n) * Math.PI * 2 - 0.03, am = (a0 + a1) / 2;
      s += '<g class="pan__cell"><path d="M' + P(R1, a0) + 'L' + P(R2, a0) + 'A' + R2 + ' ' + R2 + ' 0 0 1 ' + P(R2, a1) +
        'L' + P(R1, a1) + 'A' + R1 + ' ' + R1 + ' 0 0 0 ' + P(R1, a0) + 'Z"/>' +
        '<circle cx="' + (c + 182 * Math.cos(am)).toFixed(1) + '" cy="' + (c + 182 * Math.sin(am)).toFixed(1) + '" r="5"/></g>';
    }
    s += '<g class="pan__tower"><circle class="pan__ring" cx="230" cy="230" r="66"/><circle cx="230" cy="230" r="44"/></g>';
    return s + '</svg>';
  }

  function beamSVG() {
    const c = 230, R = 226, a = 0.26;
    const P = (ang) => (c + R * Math.cos(ang)).toFixed(1) + ' ' + (c + R * Math.sin(ang)).toFixed(1);
    return '<svg viewBox="0 0 460 460" aria-hidden="true"><path d="M230 230L' + P(-a) + 'A' + R + ' ' + R + ' 0 0 1 ' + P(a) + 'Z"/></svg>';
  }

  function barcode(seed) {
    const r = rng(seed);
    let x = 0, s = '';
    while (x < 296) {
      const w = 1 + Math.floor(r() * 4);
      if (r() > 0.42) s += '<rect x="' + x + '" y="0" width="' + w + '" height="46"/>';
      x += w + 1;
    }
    return '<svg class="receipt__code" viewBox="0 0 300 46" aria-hidden="true">' + s + '</svg>';
  }

  const CIRCLE_PATH = 'M12 34 C 6 14, 60 3, 120 5 S 214 14, 212 32 S 150 60, 96 58 S 4 52, 14 30';

  function typewriter(text) {
    return String(text).split(' ').map((w) =>
      '<span class="tw">' + Array.from(w).map((ch) => '<span class="ch">' + esc(ch) + '</span>').join('') + '</span>'
    ).join(' ');
  }

  /* ---------- moldura comum ---------- */
  function folio(s) {
    return '<header class="folio"><span class="folio__mast">Expediente</span>' +
      '<span class="folio__sec">' + esc(s.secao) + '</span>' +
      '<span class="folio__meta">Violência no mundo do trabalho</span></header>';
  }

  /* =====================================================================
     LAYOUTS
     ===================================================================== */
  const L = {};

  /* ---------------- CAPA ---------------- */
  L.capa = {
    render(s) {
      const T = window.TRABALHO || {};
      const integ = (T.integrantes || []).map(esc).join(', ');
      return '' +
        '<div class="capa__mast"><div class="capa__name">Expediente</div><div class="capa__tag">' + md(s.tagline) + '</div></div>' +
        '<div class="capa__rules"><span class="capa__rule capa__rule--a"></span><span class="capa__rule capa__rule--b"></span></div>' +
        '<div class="capa__dateline"><span>' + [T.escola, T.turma && 'Turma ' + T.turma, T.data].filter(Boolean).map(esc).join(' · ') + '</span><span>' + esc(s.tema) + '</span></div>' +
        '<h1 class="title capa__title">' + lines(s.titulo) + '</h1>' +
        '<div class="capa__faixa"><span class="capa__faixa-in" style="clip-path:' + torn(7, { sides: 'lr', ax: 1.3, n: 9 }) + '">' + md(s.faixa) + '</span></div>' +
        '<p class="capa__fina">' + md(s.linhaFina) + '</p>' +
        '<dl class="capa__exp">' +
        '<div class="capa__exp-row"><dt>Integrantes</dt><dd>' + integ + '</dd></div>' +
        '<div class="capa__exp-row"><dt>' + esc(T.rotuloProfessor || 'Professor(a)') + '</dt><dd>' + esc(T.professor) + '</dd></div>' +
        '</dl>';
    },
    animate(el, s, tl) {
      tl.from($$('.capa__rule', el), { scaleX: 0, transformOrigin: '0% 50%', duration: 1.1, ease: 'expo.inOut', stagger: 0.08 }, 0);
      tl.from($('.capa__name', el), { yPercent: 35, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0.1);
      A.up(tl, $$('.capa__tag, .capa__dateline > span', el), 0.35, { y: 12, d: 0.6, st: 0.06 });
      A.lines(tl, el, '.capa__title', 0.45, { d: 1.15, st: 0.13 });
      A.stamp(tl, $('.capa__faixa-in', el), 1.45, el);
      A.up(tl, $$('.capa__fina, .capa__exp-row', el), 2.0, { st: 0.1 });
      A.marks(tl, $('.capa__fina', el), 2.7);
    },
  };

  /* ---------------- CONCEITO ---------------- */
  L.conceito = {
    render(s) {
      return '' +
        '<div class="conc__left">' +
        '<h2 class="title conc__title">' + lines(s.titulo) + '</h2>' +
        '<p class="conc__def">' + md(s.definicao) + '</p>' +
        '<p class="src">' + esc(s.fonte) + '</p>' +
        '</div>' +
        '<ol class="conc__list">' + s.tipos.map((t, k) =>
          '<li class="conc__item"><span class="conc__rule"></span><span class="conc__num">' + pad(k + 1) + '</span>' +
          '<div><h3 class="conc__name">' + esc(t.nome) + '</h3><p class="conc__txt">' + md(t.texto) + '</p></div></li>'
        ).join('') + '</ol>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.conc__title', 0, { st: 0.08 });
      A.up(tl, $$('.conc__def, .conc__left .src', el), 0.55, { st: 0.12 });
      $$('.conc__item', el).forEach((it, k) => {
        const t = 0.7 + k * 0.28;
        tl.from($('.conc__rule', it), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.8, ease: 'expo.inOut' }, t);
        tl.from($('.conc__num', it), { yPercent: 50, opacity: 0, duration: 0.6, ease: 'power3.out' }, t + 0.12);
        tl.from($$('.conc__name, .conc__txt', it), { x: -16, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07 }, t + 0.18);
      });
      A.marks(tl, $('.conc__list', el), 2.3);
    },
  };

  /* ---------------- PIRÂMIDE ---------------- */
  L.piramide = {
    render(s) {
      const n = s.niveis.length, top = 380, bottom = 1060, cx = 580, step = (bottom - top) / (n - 1);
      const w = (k) => top + k * step;
      const yTop = (k) => 20 + k * 130;
      // setas paralelas às laterais (que passam pelos cantos de cima de cada degrau)
      const slope = (step / 2) / 130, off = 44, y0 = 24, y1 = yTop(n - 2) + 112;
      const xL = (y) => cx - w(0) / 2 - off - (y - 20) * slope;
      const xR = (y) => cx + w(0) / 2 + off + (y - 20) * slope;
      const dl = [xL(y0), y0, xL(y1), y1].map((v) => +v.toFixed(1));
      const ul = [xR(y1), y1, xR(y0), y0].map((v) => +v.toFixed(1));
      const svg = '<svg class="pyr__svg" viewBox="0 0 1160 840" aria-hidden="true">' +
        '<path class="pyr__path pyr__path--down" pathLength="1" d="M' + dl[0] + ' ' + dl[1] + 'L' + dl[2] + ' ' + dl[3] + '"/>' +
        arrowHead(dl[0], dl[1], dl[2], dl[3], 'pyr__head--down') +
        '<path class="pyr__path pyr__path--up" pathLength="1" d="M' + ul[0] + ' ' + ul[1] + 'L' + ul[2] + ' ' + ul[3] + '"/>' +
        arrowHead(ul[0], ul[1], ul[2], ul[3], 'pyr__head--up') +
        '<text class="pyr__lbl pyr__lbl--down" x="' + (dl[0] - 18) + '" y="40" text-anchor="end">' + esc(s.setaDesce) + '</text>' +
        '<text class="pyr__lbl pyr__lbl--up" x="' + (ul[2] + 18) + '" y="40">' + esc(s.setaSobe) + '</text>' +
        '</svg>';
      return '' +
        '<div class="pyr">' + svg +
        '<ol class="pyr__levels">' + s.niveis.map((lv, k) =>
          '<li class="pyr__lvl' + (k === 0 ? ' pyr__lvl--top' : '') + (k === n - 1 ? ' pyr__lvl--base' : '') + '" style="width:' + w(k) + 'px">' +
          '<span class="pyr__block"></span><span class="pyr__txt"><span class="pyr__quem">' + esc(lv.quem) + '</span>' +
          '<span class="pyr__faz">' + esc(lv.faz) + '</span></span></li>'
        ).join('') + '</ol></div>' +
        '<div class="pyr__side">' +
        '<h2 class="title pyr__title">' + lines(s.titulo) + '</h2>' +
        '<div class="pyr__data">' +
        '<div class="pyr__stat"><span class="pyr__val">' + esc(s.dado.a.valor) + '</span><span class="pyr__stxt">' + md(s.dado.a.texto) + '</span></div>' +
        '<div class="pyr__stat pyr__stat--b"><span class="pyr__val">' + esc(s.dado.b.valor) + '</span><span class="pyr__stxt">' + md(s.dado.b.texto) + '</span></div>' +
        '<p class="src">' + esc(s.dado.fonte) + '</p></div>' +
        '<p class="pyr__concl">' + md(s.conclusao) + '</p>' +
        '</div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.pyr__title', 0);
      const lv = $$('.pyr__lvl', el).reverse();
      tl.from(lv.map((l) => $('.pyr__block', l)), { scaleX: 0, duration: 0.75, ease: 'expo.out', stagger: 0.13 }, 0.2);
      tl.from(lv.map((l) => $('.pyr__txt', l)), { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', stagger: 0.13 }, 0.42);
      tl.from($('.pyr__path--down', el), { strokeDashoffset: 1, duration: 1.0, ease: 'power2.inOut' }, 1.15);
      tl.from($('.pyr__path--up', el), { strokeDashoffset: 1, duration: 1.0, ease: 'power2.inOut' }, 1.3);
      tl.from($('.pyr__head--down', el), { opacity: 0, duration: 0.2 }, 2.1);
      tl.from($('.pyr__head--up', el), { opacity: 0, duration: 0.2 }, 2.25);
      tl.from($$('.pyr__lbl', el), { opacity: 0, duration: 0.5, stagger: 0.15 }, 1.3);
      A.up(tl, $$('.pyr__stat, .pyr__data .src', el), 1.8, { st: 0.16 });
      A.up(tl, $('.pyr__concl', el), 2.4);
      A.marks(tl, $('.pyr__concl', el), 2.85);
    },
  };

  /* ---------------- SILÊNCIO ---------------- */
  L.silencio = {
    render(s) {
      const tarja = s.frase.tarjado.split(' ').map((w) =>
        '<span class="redact"><span class="redact__tx">' + esc(w) + '</span><span class="redact__bar"></span></span>').join(' ');
      return '' +
        '<div class="sil__left">' +
        '<p class="sil__pre">' + esc(s.abertura.antes) + '</p>' +
        '<div class="title sil__big">' + lines(s.abertura.numero) + '</div>' +
        '<p class="sil__txt">' + md(s.abertura.texto) + '</p>' +
        '<blockquote class="sil__quote">' + esc(s.frase.antes) + ' ' + tarja + esc(s.frase.depois) + '</blockquote>' +
        '<p class="sil__rev">' + esc(s.revelacao.antes) + ' ' + count(s.revelacao.numero, 1, '', '%') + ' ' + md(s.revelacao.depois) + '</p>' +
        '</div>' +
        '<div class="sil__right">' +
        '<h2 class="title sil__q">' + lines(s.pergunta) + '</h2>' +
        '<ul class="bars">' + s.motivos.map((m) =>
          '<li class="bar"><span class="bar__label">' + esc(m.texto) + '</span>' +
          '<span class="bar__track"><span class="bar__fill" style="width:' + m.valor + '%"></span></span>' +
          '<span class="bar__val">' + count(m.valor, 1, '', '%') + '</span></li>'
        ).join('') + '</ul>' +
        '<p class="note">' + esc(s.notaMotivos) + '</p>' +
        '<p class="src">' + esc(s.fonte) + '</p>' +
        '</div>';
    },
    animate(el, s, tl) {
      A.up(tl, $('.sil__pre', el), 0, { y: 10 });
      A.lines(tl, el, '.sil__big', 0.1, { d: 1.1 });
      A.up(tl, $('.sil__txt', el), 0.5);
      A.up(tl, $('.sil__quote', el), 1.0, { y: 18, d: 0.9 });
      tl.from($$('.redact__bar', el), { scaleX: 0, duration: 0.3, ease: 'power2.in', stagger: 0.1 }, 2.0);
      A.up(tl, $('.sil__rev', el), 2.9);
      A.count(tl, $('.sil__rev .count', el), 3.0, { d: 1.2 });
      A.lines(tl, el, '.sil__q', 3.1);
      $$('.bar', el).forEach((b, k) => {
        const t = 3.4 + k * 0.16;
        tl.from($('.bar__label', b), { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, t);
        tl.from($('.bar__fill', b), { scaleX: 0, duration: 1.0, ease: 'expo.out' }, t + 0.1);
        A.count(tl, $('.count', b), t + 0.1, { d: 1.0 });
      });
      A.up(tl, $$('.sil__right .note, .sil__right .src', el), 4.4, { st: 0.08 });
    },
  };

  /* ---------------- ASSÉDIO ---------------- */
  L.assedio = {
    render(s) {
      const col = (c, mod) => '' +
        '<div class="ass__col ass__col--' + mod + '">' +
        '<h3 class="ass__label"><span>' + esc(c.rotulo) + '</span></h3>' +
        '<div class="ass__num">' + count(c.numero) + '</div>' +
        '<p class="ass__leg">' + md(c.legenda) + '</p>' +
        '<p class="ass__def">' + md(c.definicao) + '</p></div>';
      return col(s.moral, 'moral') + '<span class="ass__vrule"></span>' + col(s.sexual, 'sexual') +
        '<div class="ass__band"><h4 class="ass__band-title">' + esc(s.frasesTitulo) + '</h4>' +
        '<ul class="ass__frases">' + s.frases.map((f) => '<li>' + typewriter(f) + '</li>').join('') + '</ul>' +
        '<p class="src ass__src">' + esc(s.fonte) + '</p></div>';
    },
    animate(el, s, tl) {
      tl.from($$('.ass__label span', el), { yPercent: 110, duration: 0.6, ease: 'power3.out', stagger: 0.25 }, 0);
      tl.from($('.ass__vrule', el), { scaleY: 0, transformOrigin: '50% 0%', duration: 1.0, ease: 'expo.inOut' }, 0.1);
      tl.from($$('.ass__num', el), { opacity: 0, duration: 0.3, stagger: 0.3 }, 0.2);
      A.count(tl, $$('.ass__num .count', el), 0.2, { d: 1.8, st: 0.3 });
      A.up(tl, $$('.ass__leg', el), 0.6, { st: 0.25 });
      A.up(tl, $$('.ass__def', el), 1.1, { st: 0.25 });
      A.marks(tl, $('.ass__col--sexual', el), 2.0);
      tl.from($('.ass__band', el), { y: 50, opacity: 0, duration: 0.7, ease: 'power3.out' }, 2.1);
      let t = 2.6;
      $$('.ass__frases li', el).forEach((li) => {
        const chars = $$('.ch', li);
        tl.from(chars, { opacity: 0, duration: 0.01, ease: 'none', stagger: 0.014 }, t);
        t += chars.length * 0.014 + 0.2;
      });
      A.up(tl, $('.ass__src', el), t, { y: 8 });
    },
  };

  /* ---------------- GÊNERO ---------------- */
  L.genero = {
    render(s) {
      const c = s.contracheque, pm = c.percentualMulher;
      return '' +
        '<h2 class="title gen__title">' + lines(s.titulo) + '</h2>' +
        '<div class="title gen__big">' + count(s.numero, 1, '', '%') + '</div>' +
        '<div class="gen__aside"><p class="gen__leg">' + md(s.legenda) + '</p><p class="gen__piorou">' + md(s.piorou) + '</p></div>' +
        '<div class="pay">' +
        '<div class="pay__row"><span class="pay__who">' + esc(c.homem.rotulo) + '</span><span class="pay__track"><span class="pay__bar" style="width:100%"></span></span><span class="pay__val">' + esc(c.homem.valor) + '</span></div>' +
        '<div class="pay__row"><span class="pay__who">' + esc(c.mulher.rotulo) + '</span><span class="pay__track">' +
        '<span class="pay__bar" style="width:' + pm + '%"></span>' +
        '<span class="pay__cut" style="left:' + pm + '%"></span>' +
        '<span class="pay__piece" style="left:' + pm + '%;width:' + (100 - pm).toFixed(1) + '%">' + esc(c.recorte) + '</span>' +
        '</span><span class="pay__val">' + esc(c.mulher.valor) + '</span></div>' +
        '</div>' +
        '<p class="gen__lei">' + md(s.lei) + '</p>' +
        '<p class="src gen__src">' + esc(s.fonte) + '</p>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.gen__title', 0);
      tl.from($('.gen__big', el), { opacity: 0, duration: 0.3 }, 0.3);
      A.count(tl, $('.gen__big .count', el), 0.3, { d: 1.6 });
      A.up(tl, $$('.gen__leg, .gen__piorou', el), 0.9, { st: 0.2 });
      A.marks(tl, $('.gen__piorou', el), 1.6);
      tl.from($$('.pay__row', el), { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out', stagger: 0.15 }, 1.4);
      tl.from($$('.pay__bar', el), { scaleX: 0, transformOrigin: '0% 50%', duration: 1.0, ease: 'expo.out', stagger: 0.15 }, 1.5);
      const piece = $('.pay__piece', el);
      const fx = gsap.getProperty(piece, 'x'), fy = gsap.getProperty(piece, 'y'), fr = gsap.getProperty(piece, 'rotation');
      tl.fromTo(piece, { x: 0, y: 0, rotation: 0, opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: true }, 2.1);
      tl.from($('.pay__cut', el), { scaleY: 0, opacity: 0, transformOrigin: '50% 0%', duration: 0.4, ease: 'power2.out' }, 2.5);
      tl.to(piece, { x: fx, y: fy, rotation: fr, duration: 0.7, ease: 'power2.in' }, 2.95);
      A.up(tl, $$('.gen__lei, .gen__src', el), 3.3, { st: 0.1 });
    },
  };

  /* ---------------- INTERSECÇÃO (raça + gênero) ---------------- */
  L.interseccao = {
    render(s) {
      const max = Math.max(...s.linhas.flatMap((l) => l.valores));
      return '' +
        '<div class="int__left">' +
        '<h2 class="title int__title">' + lines(s.titulo) + '</h2>' +
        '<div class="title int__big"><span class="int__minus">−</span>' + count(s.destaque.numero, 0, '', '%') + '</div>' +
        '<p class="int__txt">' + md(s.destaque.texto) + '</p>' +
        '<p class="int__concl">' + md(s.conclusao) + '</p>' +
        '</div>' +
        '<div class="int__chart">' +
        '<div class="legend"><span><i class="sw sw--a"></i>' + esc(s.grupos[0]) + '</span><span><i class="sw sw--b"></i>' + esc(s.grupos[1]) + '</span></div>' +
        s.linhas.map((l, k) =>
          '<div class="grp' + (k === s.linhas.length - 1 ? ' grp--total' : '') + '"><h4 class="grp__label">' + esc(l.rotulo) + '</h4>' +
          l.valores.map((v, j) =>
            '<div class="hb hb--' + (j ? 'b' : 'a') + '"><span class="hb__bar" style="width:' + (v / max * 100).toFixed(2) + '%"></span>' +
            '<span class="hb__val">' + count(v, 0, 'R$ ') + '</span></div>').join('') +
          '</div>').join('') +
        '<p class="src">' + esc(s.fonte) + '</p>' +
        '</div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.int__title', 0);
      tl.from($('.int__big', el), { opacity: 0, duration: 0.3 }, 0.4);
      A.count(tl, $('.int__big .count', el), 0.4, { d: 1.4 });
      A.up(tl, $('.int__txt', el), 0.8);
      tl.from($('.legend', el), { opacity: 0, y: 10, duration: 0.5 }, 0.3);
      $$('.grp', el).forEach((g, k) => {
        const t = 0.6 + k * 0.32;
        tl.from($('.grp__label', g), { opacity: 0, x: -10, duration: 0.45 }, t);
        tl.from($$('.hb__bar', g), { scaleX: 0, transformOrigin: '0% 50%', duration: 1.0, ease: 'expo.out', stagger: 0.12 }, t + 0.08);
        A.count(tl, $$('.hb__val .count', g), t + 0.08, { d: 1.0, st: 0.12 });
      });
      A.up(tl, $$('.int__concl, .int__chart .src', el), 2.2, { st: 0.15 });
      A.marks(tl, $('.int__concl', el), 2.7);
    },
  };

  /* ---------------- CLASSIFICADOS (preconceito) ---------------- */
  const AD_EXTRA = ['Salário a combinar. Tratar no local.', 'Enviar currículo com foto.', 'Início imediato.', 'Comparecer com documentos.', 'Vagas limitadas.'];
  L.classificados = {
    render(s) {
      return '' +
        '<div class="cls">' +
        '<div class="cls__head"><span class="cls__name">Classificados</span><span class="cls__sub">Empregos · Precisa-se</span></div>' +
        '<div class="cls__grid">' + s.anuncios.map((a, k) =>
          '<article class="ad"><h4 class="ad__vaga">' + esc(a.vaga) + '</h4>' +
          '<p class="ad__txt">' + md(a.texto) + '</p>' +
          '<p class="ad__extra">' + esc(a.extra || AD_EXTRA[k % AD_EXTRA.length]) + '</p>' +
          '<span class="ad__tag-wrap"><span class="stamp ad__tag">' + esc(a.tipo) + '</span></span></article>'
        ).join('') +
        '<p class="cls__aviso">' + md(s.aviso) + '</p>' +
        '</div></div>' +
        '<div class="cls__side">' +
        '<h2 class="title cls__title">' + lines(s.titulo) + '</h2>' +
        s.dados.map((d) => '<div class="stat"><span class="stat__num">' + esc(d.numero) + '</span>' +
          '<p class="stat__txt">' + md(d.texto) + '</p><p class="src">' + esc(d.fonte) + '</p></div>').join('') +
        '</div>';
    },
    animate(el, s, tl) {
      tl.from($('.cls__name', el), { yPercent: 50, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0);
      tl.from($('.cls__sub', el), { opacity: 0, duration: 0.5 }, 0.2);
      tl.from($$('.ad', el), { opacity: 0, y: 16, rotation: (i) => (i % 2 ? 1.4 : -1.4), duration: 0.55, ease: 'power3.out', stagger: 0.1 }, 0.3);
      A.lines(tl, el, '.cls__title', 0.25);
      $$('.ad', el).forEach((ad, k) => {
        const t = 1.2 + k * 0.48;
        A.marks(tl, ad, t);
        tl.from($('.ad__tag', ad), { scale: 2.1, opacity: 0, duration: 0.28, ease: 'power4.in' }, t + 0.36);
      });
      A.up(tl, $('.cls__aviso', el), 3.7);
      A.up(tl, $$('.stat', el), 3.6, { st: 0.3 });
    },
  };

  /* ---------------- ESCRAVIDÃO ---------------- */
  L.escravidao = {
    render(s) {
      return '' +
        '<div class="esc__left">' +
        '<p class="kicker">' + esc(s.chamada) + '</p>' +
        '<h2 class="title esc__title">' + lines(s.titulo) + '</h2>' +
        '<div class="title esc__num">' + count(s.numero) + '</div>' +
        '<p class="esc__leg">' + md(s.legenda) + '</p>' +
        '<ul class="esc__perfil">' + s.perfil.map((p) =>
          '<li><span class="esc__pv">' + esc(p.valor) + '</span><span class="esc__pt">' + esc(p.texto) + '</span></li>').join('') + '</ul>' +
        '<p class="esc__hist">' + md(s.historico) + '</p>' +
        '</div>' +
        '<div class="esc__right">' +
        '<figure class="tally">' + tallySVG(s.numero) + '<figcaption>' + esc(s.legendaRiscos) + '</figcaption></figure>' +
        '<div class="esc__oque"><h4>' + esc(s.oQueE.titulo) + '</h4><ol>' +
        s.oQueE.itens.map((t, k) => '<li><span class="esc__oi">' + (k + 1) + '</span>' + esc(t) + '</li>').join('') + '</ol></div>' +
        '</div>' +
        '<p class="src esc__src">' + esc(s.fonte) + '</p>';
    },
    animate(el, s, tl) {
      A.up(tl, $('.kicker', el), 0, { y: 10 });
      A.lines(tl, el, '.esc__title', 0.1, { st: 0.14 });
      tl.from($('.esc__num', el), { opacity: 0, duration: 0.3 }, 0.6);
      A.count(tl, $('.esc__num .count', el), 0.6, { d: 2.4, ease: 'power1.inOut' });
      const rows = $$('.tally__row', el);
      tl.from(rows, { opacity: 0, duration: 0.2, ease: 'none', stagger: 2.2 / rows.length }, 0.6);
      A.up(tl, $('.esc__leg', el), 1.0);
      tl.from($$('.esc__perfil li', el), { opacity: 0, y: 16, duration: 0.55, ease: 'power3.out', stagger: 0.14 }, 2.3);
      A.up(tl, $$('.esc__hist, .tally figcaption', el), 2.9, { st: 0.1 });
      tl.from($('.esc__oque h4', el), { opacity: 0, duration: 0.4 }, 3.1);
      tl.from($$('.esc__oque li', el), { opacity: 0, x: -14, duration: 0.45, ease: 'power3.out', stagger: 0.12 }, 3.2);
      A.up(tl, $('.esc__src', el), 3.7, { y: 8 });
    },
  };

  /* ---------------- RECIBO (uberização) ---------------- */
  L.recibo = {
    render(s) {
      const r = s.recibo;
      return '' +
        '<div class="rec__left">' +
        '<h2 class="title rec__title">' + lines(s.titulo) + '</h2>' +
        '<div class="rec__num">' + count(s.numero, 1) + '<span class="rec__suf">' + esc(s.numeroSufixo) + '</span></div>' +
        '<p class="rec__leg">' + md(s.legenda) + '</p>' +
        '<p class="rec__txt">' + md(s.texto) + '</p>' +
        '<p class="xref">' + esc(s.lente) + '</p>' +
        '</div>' +
        '<div class="printer"><span class="printer__slot"></span><div class="printer__mouth">' +
        '<div class="receipt" style="clip-path:' + torn(3, { sides: 'b', ay: 1.4, n: 14 }) + '">' +
        '<p class="receipt__head">' + esc(r.cabecalho) + '</p>' +
        '<p class="receipt__sub">' + esc(r.subtitulo) + '</p>' +
        '<ul class="receipt__lines">' + r.linhas.map((l) =>
          '<li class="receipt__line' + (l.destaque ? ' receipt__line--hot' : '') + '">' +
          '<span class="receipt__row"><span class="receipt__item">' + esc(l.item) + '</span><span class="receipt__dots"></span>' +
          '<span class="receipt__val">' + md(l.valor) +
          (l.destaque ? '<svg class="receipt__circle" viewBox="0 0 220 64" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + CIRCLE_PATH + '"/></svg>' : '') +
          '</span></span>' +
          (l.obs ? '<span class="receipt__obs">' + esc(l.obs) + '</span>' : '') + '</li>'
        ).join('') + '</ul>' +
        '<p class="receipt__foot">' + esc(r.rodape) + '</p>' + barcode(16) +
        '</div></div></div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.rec__title', 0, { st: 0.1 });
      tl.from($('.rec__num', el), { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 0.45);
      A.count(tl, $('.rec__num .count', el), 0.45, { d: 1.2 });
      A.up(tl, $$('.rec__leg, .rec__txt, .xref', el), 0.8, { st: 0.15 });
      A.marks(tl, $('.rec__txt', el), 1.8);
      tl.from($('.printer__slot', el), { scaleX: 0, duration: 0.6, ease: 'expo.out' }, 0.2);
      tl.from($('.receipt', el), { yPercent: -101, duration: 2.3, ease: 'steps(26)' }, 0.7);
      tl.from($$('.receipt__circle path', el), { strokeDashoffset: 1, duration: 0.7, ease: 'power2.inOut' }, 3.2);
    },
  };

  /* ---------------- ACIDENTES ---------------- */
  L.acidentes = {
    render(s) {
      return '' +
        '<div class="aci__left">' +
        '<h2 class="title aci__title">' + lines(s.titulo) + '</h2>' +
        '<div class="aci__num">' + count(s.numero) + '<span class="aci__suf">' + esc(s.numeroSufixo) + '</span></div>' +
        '<p class="aci__leg">' + md(s.legenda) + '</p>' +
        '<p class="aci__n2"><span class="aci__n2v">' + esc(s.numero2) + '</span>' + md(s.legenda2) + '</p>' +
        '</div>' +
        '<div class="aci__right">' +
        '<div class="clock"><h4 class="clock__title">' + esc(s.relogio.titulo) + '</h4>' + clockSVG() +
        '<p class="clock__foot">' + esc(s.relogio.rodape) + '</p></div>' +
        '<div class="aci__prof"><h4>' + esc(s.profissoes.titulo) + '</h4><ol>' +
        s.profissoes.itens.map((t, k) => '<li><span>' + (k + 1) + '</span>' + esc(t) + '</li>').join('') + '</ol></div>' +
        '<p class="aci__alerta">' + md(s.alerta) + '</p>' +
        '</div>' +
        '<p class="src aci__src">' + esc(s.fonte) + '</p>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.aci__title', 0, { st: 0.12 });
      tl.from($('.aci__num', el), { opacity: 0, duration: 0.3 }, 0.5);
      A.count(tl, $('.aci__num .count', el), 0.5, { d: 1.8 });
      A.up(tl, $$('.aci__leg, .aci__n2', el), 0.9, { st: 0.2 });
      tl.from($('.clock__title', el), { opacity: 0, y: 10, duration: 0.5 }, 1.0);
      tl.from($$('.clock__base, .clock__tick, .clock__lbl', el), { opacity: 0, duration: 0.25, stagger: 0.012 }, 1.1);
      tl.from($$('.clock__mark', el), { opacity: 0, y: 14, duration: 0.3, ease: 'power3.out', stagger: 0.26 }, 1.6);
      tl.from($('.clock__foot', el), { opacity: 0, duration: 0.4 }, 3.4);
      A.up(tl, $$('.aci__prof h4, .aci__prof li', el), 2.0, { st: 0.1 });
      A.up(tl, $('.aci__alerta', el), 3.0);
      A.marks(tl, $('.aci__alerta', el), 3.4);
      A.up(tl, $('.aci__src', el), 3.6, { y: 8 });
    },
  };

  /* ---------------- TRABALHO INFANTIL ---------------- */
  L.infantil = {
    render(s) {
      return '' +
        '<h2 class="title inf__title">' + lines(s.titulo) + '</h2>' +
        '<div class="inf__left">' +
        '<div class="inf__num">' + count(s.numero, 2) + '<span class="inf__suf">' + esc(s.numeroSufixo) + '</span></div>' +
        '<p class="inf__leg">' + md(s.legenda) + '</p>' +
        '<p class="inf__subiu">' + md(s.subiu) + '</p>' +
        '</div>' +
        '<ul class="inf__fatos">' + s.fatos.map((f) =>
          '<li><span class="inf__fv">' + esc(f.valor) + '</span><span class="inf__ft">' + md(f.texto) + '</span></li>').join('') + '</ul>' +
        '<div class="ruler">' +
        '<div class="ruler__top"><h4 class="ruler__title">' + esc(s.regua.titulo) + '</h4><p class="src">' + esc(s.fonte) + '</p></div>' +
        '<div class="ruler__segs">' + s.regua.faixas.map((f, k) =>
          '<div class="seg seg--' + k + '" style="flex:' + (f.ate - f.de) + '"><span class="seg__bar"></span></div>').join('') + '</div>' +
        rulerSVG() +
        '<div class="ruler__labels">' + s.regua.faixas.map((f) =>
          '<span class="seg__txt" style="flex:' + (f.ate - f.de) + '">' + esc(f.texto) + '</span>').join('') + '</div>' +
        '</div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.inf__title', 0);
      tl.from($('.inf__num', el), { opacity: 0, duration: 0.3 }, 0.35);
      A.count(tl, $('.inf__num .count', el), 0.35, { d: 1.6 });
      A.up(tl, $$('.inf__leg, .inf__subiu', el), 0.7, { st: 0.2 });
      A.marks(tl, $('.inf__subiu', el), 1.6);
      tl.from($$('.inf__fatos li', el), { opacity: 0, x: 24, duration: 0.55, ease: 'power3.out', stagger: 0.14 }, 0.9);
      A.up(tl, $('.ruler__top', el), 1.8, { y: 10 });
      tl.from($('.ruler__scale', el), { opacity: 0, y: 10, duration: 0.5 }, 1.9);
      tl.from($$('.seg__bar', el), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.7, ease: 'expo.out', stagger: 0.35 }, 2.1);
      tl.from($$('.seg__txt', el), { opacity: 0, y: 8, duration: 0.45, stagger: 0.35 }, 2.3);
    },
  };

  /* ---------------- TEORIA: MARX + WEBER ---------------- */
  L.teoria = {
    render(s) {
      const m = s.marx, w = s.weber, e = m.esquema;
      const concepts = (list) => '<dl class="th__concepts">' + list.map((c) =>
        '<div class="th__c"><dt>' + esc(c.termo) + '</dt><dd>' + md(c.texto) + '</dd></div>').join('') + '</dl>';
      return '' +
        '<div class="th th--marx">' +
        '<div class="th__head"><h2 class="title th__name">' + lines(m.nome) + '</h2><p class="th__full">' + esc(m.completo) + '</p></div>' +
        concepts(m.conceitos) +
        '<figure class="mv"><figcaption>' + esc(e.titulo) + '</figcaption><div class="mv__bar">' +
        Array.from({ length: 8 }, (_, h) => '<span class="mv__h' + (h < e.horasPagas ? '' : ' mv__h--x') + '">' + (h + 1) + 'ª h</span>').join('') +
        '</div><div class="mv__legend"><span class="mv__lp" style="flex:' + e.horasPagas + '">' + esc(e.pago) + '</span>' +
        '<span class="mv__ls" style="flex:' + (8 - e.horasPagas) + '">' + esc(e.excedente) + '</span></div></figure>' +
        '<blockquote class="th__quote">' + esc(m.citacao) + '<cite>' + esc(m.obra) + '</cite></blockquote>' +
        '</div>' +
        '<span class="th__vrule"></span>' +
        '<div class="th th--weber">' +
        '<div class="th__head th__head--stack"><h2 class="title th__name">' + lines(w.nome) + '</h2><p class="th__full">' + esc(w.completo) + '</p></div>' +
        concepts(w.conceitos) +
        '<div class="types"><p class="types__title">' + esc(w.tiposTitulo) + '</p><ul>' +
        w.tipos.map((t, k) => '<li class="type' + (k === w.tipoDestaque ? ' type--on' : '') + '"><span class="type__fill"></span><span class="type__tx">' + esc(t) + '</span></li>').join('') +
        '</ul></div>' +
        '<p class="th__obra">' + esc(w.obra) + '</p>' +
        '</div>';
    },
    animate(el, s, tl) {
      const mx = $('.th--marx', el), wb = $('.th--weber', el);
      A.lines(tl, mx, '.th__name', 0);
      A.up(tl, $('.th__full', mx), 0.25, { y: 10 });
      A.up(tl, $$('.th__c', mx), 0.45, { st: 0.18 });
      A.marks(tl, $('.th__concepts', mx), 1.3);
      tl.from($('.mv figcaption', mx), { opacity: 0, duration: 0.4 }, 1.0);
      tl.from($$('.mv__h', mx), { opacity: 0, y: 12, duration: 0.3, ease: 'power2.out', stagger: 0.1 }, 1.1);
      tl.from($$('.mv__lp, .mv__ls', mx), { opacity: 0, duration: 0.4, stagger: 0.18 }, 1.95);
      A.up(tl, $('.th__quote', mx), 2.4);
      tl.from($('.th__vrule', el), { scaleY: 0, transformOrigin: '50% 0%', duration: 1.1, ease: 'expo.inOut' }, 0.2);
      A.lines(tl, wb, '.th__name', 1.2);
      A.up(tl, $$('.th__full, .th__c', wb), 1.45, { st: 0.15 });
      tl.from($$('.type', wb), { opacity: 0, y: 10, duration: 0.4, stagger: 0.12 }, 2.4);
      tl.from($('.type--on .type__fill', wb), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, ease: 'power2.inOut' }, 2.9);
      A.marks(tl, $('.th__concepts', wb), 3.0);
      A.up(tl, $('.th__obra', wb), 3.2, { y: 8 });
    },
  };

  /* ---------------- BOURDIEU ---------------- */
  L.bourdieu = {
    render(s) {
      return '' +
        '<div class="bou__main">' +
        '<p class="kicker">' + esc(s.autor) + '</p>' +
        '<h2 class="title bou__concept">' + lines(s.conceito) + '</h2>' +
        '<blockquote class="bou__quote">' + lines(s.citacao) + '</blockquote>' +
        '<cite class="bou__obra">' + esc(s.obra) + '</cite>' +
        '<p class="bou__exp">' + md(s.explicacao) + '</p>' +
        '</div>' +
        '<aside class="bou__side"><h4 class="bou__side-title">' + esc(s.exemplosTitulo) + '</h4><ul class="bou__ex">' +
        s.exemplos.map((e) => '<li>' + md('~~' + e + '~~') + '</li>').join('') + '</ul></aside>';
    },
    animate(el, s, tl) {
      A.up(tl, $('.kicker', el), 0, { y: 10 });
      A.lines(tl, el, '.bou__concept', 0.1);
      A.lines(tl, el, '.bou__quote', 0.5, { st: 0.16, d: 1.2 });
      A.up(tl, $('.bou__obra', el), 1.4, { y: 8 });
      A.marks(tl, $('.bou__quote', el), 1.7);
      A.up(tl, $('.bou__exp', el), 1.9);
      A.marks(tl, $('.bou__exp', el), 2.6);
      A.up(tl, $('.bou__side-title', el), 2.3, { y: 10 });
      $$('.bou__ex li', el).forEach((li, k) => {
        const t = 2.6 + k * 0.55;
        A.up(tl, li, t, { y: 14 });
        A.marks(tl, li, t + 0.38);
      });
    },
  };

  /* ---------------- PANÓPTICO: ANTUNES + FOUCAULT ---------------- */
  L.panoptico = {
    render(s) {
      const a = s.antunes, f = s.foucault;
      return '' +
        '<div class="pan__antunes">' +
        '<div class="th__head th__head--stack"><h2 class="title th__name">' + lines(a.nome) + '</h2><p class="th__full">' + esc(a.completo) + '</p></div>' +
        '<h3 class="pan__term">' + esc(a.termo) + '</h3>' +
        '<p class="pan__text">' + md(a.texto) + '</p>' +
        '<p class="pan__obra">' + esc(a.obra) + '</p>' +
        '</div>' +
        '<span class="pan__vrule"></span>' +
        '<div class="pan__foucault">' +
        '<div class="th__head"><h2 class="title th__name">' + lines(f.nome) + '</h2><p class="th__full">' + esc(f.completo) + '</p></div>' +
        '<div class="pan__body">' +
        '<figure class="pan__fig"><div class="pan__plan">' + panopticSVG() + '<div class="pan__beam">' + beamSVG() + '</div></div>' +
        '<figcaption class="pan__cap"><p><i class="sw sw--tower"></i>' + esc(f.torre) + '</p><p><i class="sw sw--cell"></i>' + esc(f.celas) + '</p></figcaption></figure>' +
        '<div class="pan__txt">' +
        '<h3 class="pan__term">' + esc(f.termo) + '</h3>' +
        '<p class="pan__text">' + md(f.texto) + '</p>' +
        '<p class="pan__hoje-t">' + esc(f.hojeTitulo) + '</p>' +
        '<ul class="pan__tags">' + f.hoje.map((t) => '<li class="tag-wrap"><span class="stamp tag">' + esc(t) + '</span></li>').join('') + '</ul>' +
        '<p class="pan__obra">' + esc(f.obra) + '</p>' +
        '</div></div></div>';
    },
    animate(el, s, tl, opts) {
      const an = $('.pan__antunes', el), fo = $('.pan__foucault', el);
      A.lines(tl, an, '.th__name', 0);
      A.up(tl, $$('.th__full, .pan__term, .pan__text, .pan__obra', an), 0.3, { st: 0.12 });
      A.marks(tl, an, 1.3);
      tl.from($('.pan__vrule', el), { scaleY: 0, transformOrigin: '50% 0%', duration: 1.0, ease: 'expo.inOut' }, 0.3);
      A.lines(tl, fo, '.th__name', 0.9);
      A.up(tl, $('.th__full', fo), 1.1, { y: 10 });
      tl.from($$('.pan__cell', fo), { opacity: 0, duration: 0.2, stagger: 0.035 }, 1.2);
      tl.from($('.pan__tower', fo), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, 1.95);
      tl.from($('.pan__beam', fo), { opacity: 0, duration: 0.6 }, 2.3);
      A.up(tl, $$('.pan__cap p', fo), 2.4, { st: 0.1, y: 8 });
      A.up(tl, $$('.pan__txt .pan__term, .pan__txt .pan__text', fo), 1.5, { st: 0.15 });
      A.marks(tl, $('.pan__txt', fo), 2.6);
      A.up(tl, $('.pan__hoje-t', fo), 2.8, { y: 8 });
      tl.from($$('.pan__tags .tag', fo), { scale: 1.9, opacity: 0, duration: 0.26, ease: 'power4.in', stagger: 0.22 }, 3.0);
      A.up(tl, $('.pan__txt .pan__obra', fo), 4.1, { y: 8 });
      if (opts && opts.loop) gsap.to($('.pan__beam', fo), { rotation: '+=360', duration: 16, ease: 'none', repeat: -1 });
    },
  };

  /* ---------------- SERVIÇO: COMO COMBATER ---------------- */
  L.servico = {
    render(s) {
      return '' +
        '<h2 class="title srv__title">' + lines(s.titulo) + '</h2>' +
        '<div class="srv__laws"><h3 class="srv__h">' + esc(s.leisTitulo) + '</h3><ul>' + s.leis.map((l) =>
          '<li class="law"><span class="law__name">' + esc(l.nome) + '</span><span class="law__year">' + esc(l.ano) + '</span>' +
          '<span class="law__txt">' + md(l.texto) + '</span></li>').join('') + '</ul></div>' +
        '<div class="srv__chan"><h3 class="srv__h">' + esc(s.canaisTitulo) + '</h3><ul>' + s.canais.map((c) =>
          '<li class="chan"><span class="chan__name">' + esc(c.nome) + '</span><span class="chan__onde">' + esc(c.onde) + '</span>' +
          '<span class="chan__txt">' + md(c.texto) + '</span></li>').join('') + '</ul></div>' +
        '<div class="srv__dica"><span>' + md(s.dica) + '</span></div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.srv__title', 0);
      tl.from($$('.srv__h', el), { opacity: 0, y: 10, duration: 0.5, stagger: 0.15 }, 0.4);
      tl.from($$('.law', el), { opacity: 0, x: -16, duration: 0.5, ease: 'power3.out', stagger: 0.11 }, 0.6);
      tl.from($$('.chan', el), { opacity: 0, x: 16, duration: 0.5, ease: 'power3.out', stagger: 0.13 }, 1.1);
      tl.from($('.srv__dica', el), { yPercent: 60, opacity: 0, duration: 0.6, ease: 'power3.out' }, 2.1);
    },
  };

  /* ---------------- PERGUNTA FINAL ---------------- */
  L.pergunta = {
    render(s) {
      return '' +
        '<p class="perg__concl">' + md(s.conclusao) + '</p>' +
        '<p class="perg__label">' + esc(s.rotuloPergunta) + '</p>' +
        '<h2 class="title perg__q">' + lines(s.pergunta) + '</h2>' +
        '<div class="perg__stamp-wrap"><span class="stamp perg__stamp">' + esc(s.carimbo) + '</span></div>' +
        '<p class="perg__apoio">' + md(s.apoio) + '</p>';
    },
    animate(el, s, tl) {
      A.up(tl, $('.perg__concl', el), 0, { d: 0.9 });
      A.up(tl, $('.perg__label', el), 0.9, { y: 10 });
      A.lines(tl, el, '.perg__q', 1.1, { st: 0.16, d: 1.2 });
      A.marks(tl, $('.perg__q', el), 2.6);
      A.stamp(tl, $('.perg__stamp', el), 3.1, el);
      A.up(tl, $('.perg__apoio', el), 3.6);
    },
  };

  /* ---------------- REFERÊNCIAS ---------------- */
  function shortUrl(u) {
    try {
      const x = new URL(u);
      const host = x.hostname.replace(/^www\./, '');
      const tail = (x.pathname + x.search).replace(/\/$/, '');
      const last = tail.split('/').filter(Boolean).pop() || '';
      if (!last) return host;
      return host + '/…/' + (last.length > 34 ? last.slice(0, 33) + '…' : last);
    } catch (e) { return u; }
  }
  L.referencias = {
    render(s) {
      return '' +
        '<h2 class="title ref__title">' + lines(s.titulo) + '</h2>' +
        '<p class="ref__nota">' + esc(s.nota) + '</p>' +
        '<div class="ref__cols">' + s.grupos.map((g) =>
          '<section class="ref__g"><h3>' + esc(g.titulo) + '</h3><ol>' + g.itens.map((it) =>
            '<li>' + esc(it.texto) + (it.url ? ' <a href="' + esc(it.url) + '" target="_blank" rel="noopener" title="' + esc(it.url) + '">' + esc(shortUrl(it.url)) + '</a>' : '') + '</li>'
          ).join('') + '</ol></section>').join('') +
        '</div>';
    },
    animate(el, s, tl) {
      A.lines(tl, el, '.ref__title', 0);
      A.up(tl, $('.ref__nota', el), 0.3, { y: 8 });
      tl.from($$('.ref__g h3, .ref__g li', el), { opacity: 0, y: 8, duration: 0.35, ease: 'power2.out', stagger: 0.022 }, 0.4);
    },
  };

  /* =====================================================================
     API pública
     ===================================================================== */
  function render(s, i, total) {
    const lay = L[s.layout];
    if (!lay) throw new Error('Layout desconhecido: ' + s.layout);
    const theme = s.tema || 'papel';
    return '<section class="slide slide--' + s.layout + ' theme-' + theme + '" data-index="' + i + '" data-theme="' + theme + '"' +
      ' role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' de ' + total + ': ' + esc(s.secao) + '">' +
      '<div class="slide__paper">' + (s.layout === 'capa' ? '' : folio(s)) + lay.render(s, i, total) + '</div>' +
      '<span class="slide__shade"></span></section>';
  }

  function animate(el, s, tl, opts) {
    const lay = L[s.layout];
    if (lay && lay.animate) lay.animate(el, s, tl, opts || {});
  }

  window.Layouts = { render, animate, md, esc, pad };
})();
