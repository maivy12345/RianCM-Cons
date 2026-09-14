/* Shared: mobile menu drawer + project filter (dùng cho các trang inner) */
(function () {
  // ---- Mobile menu drawer ----
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('header nav');
  var menu = document.querySelector('.menu');
  var overlay = document.querySelector('.nav-overlay');
  if (burger && nav && overlay) {
    nav.id = nav.id || 'site-nav';
    var close = function () {
      nav.classList.remove('is-open');
      overlay.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    var open = function () {
      nav.classList.add('is-open');
      overlay.classList.add('is-open');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('is-open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    if (menu) {
      menu.addEventListener('click', function (e) {
        if (e.target && e.target.tagName === 'A') close();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) close();
    });
  }

  // ---- Projects filter (khối .projects-listing với data-category trên card) ----
  var filters = document.querySelectorAll('.projects-filters .filter');
  var cards = document.querySelectorAll('.project-grid .project-card');
  var emptyEl = document.querySelector('.projects-listing .empty-state');
  if (filters.length && cards.length) {
    var apply = function (cat) {
      var visible = 0;
      cards.forEach(function (c) {
        var cats = (c.getAttribute('data-category') || '').split(/\s+/);
        var match = cat === 'all' || cats.indexOf(cat) !== -1;
        c.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      if (emptyEl) emptyEl.classList.toggle('hidden', visible !== 0);
    };
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        apply(btn.getAttribute('data-filter') || 'all');
      });
    });
  }
})();
