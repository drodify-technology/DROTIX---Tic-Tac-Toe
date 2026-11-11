/* ====== SITE SETTINGS: change these before you publish ====== */
var SITE = {
  email: 'support@YOUR-DOMAIN.com',   // where contact messages go
  formEndpoint: '',                   // optional: Formspree/Getform URL. Empty = opens the visitor's email app
  playStore: '#', appStore: '#'       // add real store links when the app is live
};
(function () {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-email]').forEach(function (a) { a.textContent = SITE.email; a.href = 'mailto:' + SITE.email; });
  document.querySelectorAll('a[data-store]').forEach(function (a) {
    var u = a.dataset.store === 'play' ? SITE.playStore : SITE.appStore;
    if (u && u !== '#') { a.href = u; var s = a.querySelector('.soon-badge'); if (s) s.remove(); }
  });
  /* header: scroll state + progress bar */
  var header = document.querySelector('.site-header'), bar = document.querySelector('.progress i');
  var onScroll = function () {
    var y = window.scrollY || document.documentElement.scrollTop, h = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (bar) bar.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  /* mobile menu (full-screen overlay) */
  var burger = document.querySelector('.burger'), menu = document.getElementById('menu'), root = document.documentElement;
  var setMenu = function (open) {
    if (!menu || !burger) return;
    if (open) {
      var hb = header.getBoundingClientRect().bottom, br = burger.getBoundingClientRect();
      menu.style.setProperty('--hb', Math.round(hb) + 'px');
      menu.style.setProperty('--bx', Math.round(br.left + br.width / 2) + 'px'); menu.style.setProperty('--by', Math.round(br.top + br.height / 2) + 'px');
    }
    menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open));
    try { menu.inert = !open; } catch (e) {}
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    root.classList.toggle('menu-open', open);
    if (open) { setTimeout(function () { var a = menu.querySelector('a'); if (a) a.focus({ preventScroll: true }); }, 450); }
  };
  if (menu && burger) {
    try { menu.inert = true; } catch (e) {}
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('open')) return;
      if (e.key === 'Escape') { setMenu(false); burger.focus(); }
      if (e.key === 'Tab') {
        var f = [burger].concat([].slice.call(menu.querySelectorAll('a'))), i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setMenu(false); });
  }
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  } else els.forEach(function (e) { e.classList.add('in'); });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var to = +el.dataset.count, done = false;
    var run = function () {
      if (done) return; done = true; var t0 = performance.now();
      (function tick(t) { var p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
    };
    if ('IntersectionObserver' in window) { new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { run(); o.disconnect(); } }).observe(el); } else run();
  });
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    var msg = f.querySelector('.form-msg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var trap = f.querySelector('.hp input'); if (trap && trap.value) return;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var data = {}; new FormData(f).forEach(function (v, k) { if (k !== 'website') data[k] = v; });
      var subject = f.dataset.subject || 'Website message';
      var show = function (ok, t) { if (msg) { msg.className = 'form-msg ' + (ok ? 'ok' : 'err'); msg.textContent = t; } };
      if (SITE.formEndpoint) {
        fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(Object.assign({ _subject: subject }, data)) })
          .then(function (r) { if (!r.ok) throw 0; f.reset(); show(true, 'Thank you! We got your message and will reply soon.'); })
          .catch(function () { show(false, 'Something went wrong. Please email us at ' + SITE.email); });
      } else {
        var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
        window.location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        show(true, 'Your email app should open with the message ready. Just press send.');
      }
    });
  });
})();
