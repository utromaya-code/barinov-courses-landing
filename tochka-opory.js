const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const hero = document.getElementById("hero");
const applySection = document.getElementById("apply");
const stickyCta = document.querySelector(".mobile-sticky-cta");

function onScrollHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);

  if (stickyCta && hero) {
    const pastHero = window.scrollY > hero.offsetHeight * 0.72;
    const beforeForm = !applySection || window.scrollY < applySection.offsetTop - window.innerHeight * 0.45;
    const showSticky = pastHero && beforeForm;
    stickyCta.classList.toggle("is-visible", showSticky);
  }
}

window.addEventListener("scroll", onScrollHeader);
onScrollHeader();

if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    header?.classList.remove("nav-active");
  };

  const openNav = () => {
    navToggle.setAttribute("aria-expanded", "true");
    siteNav.classList.add("is-open");
    document.body.classList.add("nav-open");
    header?.classList.add("nav-active");
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;
    button.setAttribute("aria-expanded", String(!expanded));
    if (answer) {
      answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
    }
  });
});

const form = document.getElementById("course-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const message = [
      "Здравствуйте! Хочу оставить заявку на курс «Точка опоры».",
      `Имя: ${data.get("name") || ""}`,
      `Контакт: ${data.get("contact") || ""}`,
      `Уровень: ${data.get("level") || "-"}`,
      `Запрос: ${data.get("goal") || "-"}`
    ].join("\n");

    window.location.href = `https://t.me/vsemaya?text=${encodeURIComponent(message)}`;
  });
}
