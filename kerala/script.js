// ============================================================
// Волшебная Керала — настройки и поведение страницы
// ============================================================

// Сколько мест осталось — поменяйте число здесь, оно подставится в бейдж в hero.
var PLACES_LEFT = 6;

document.getElementById('places-count').textContent = PLACES_LEFT;

// Цели Яндекс.Метрики: клики по Telegram / WhatsApp (data-goal на ссылках)
document.querySelectorAll('[data-goal]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (window.ym && window.YM_COUNTER_ID) {
      ym(window.YM_COUNTER_ID, 'reachGoal', link.dataset.goal);
    }
  });
});

// Липкая кнопка «Забронировать» на мобильном — показывается после hero
var stickyCta = document.getElementById('sticky-cta');
var hero = document.querySelector('.hero');
if ('IntersectionObserver' in window) {
  new IntersectionObserver(function (entries) {
    stickyCta.classList.toggle('is-visible', !entries[0].isIntersecting);
  }, { threshold: 0.1 }).observe(hero);
} else {
  stickyCta.classList.add('is-visible');
}

// Scroll-reveal (отключается через prefers-reduced-motion в CSS)
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
}

// В аккордеоне держим открытым только один пункт
document.querySelectorAll('[data-accordion]').forEach(function (acc) {
  acc.addEventListener('toggle', function (e) {
    if (e.target.open) {
      acc.querySelectorAll('details[open]').forEach(function (d) {
        if (d !== e.target) d.open = false;
      });
    }
  }, true);
});

// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();
