const config = window.TOCHKA_SITE_CONFIG || window.YOGA_SITE_CONFIG || {};
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const hero = document.getElementById("hero");
const applySection = document.getElementById("apply");
function onScrollHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
    siteNav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("nav-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;
    button.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (answer) {
      answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
    }
  });
});

if (
  document.documentElement.classList.contains("luxury-page") &&
  window.matchMedia("(min-width: 901px)").matches
) {
  document.querySelectorAll(".program-panel").forEach((panel) => {
    panel.hidden = false;
    panel.style.maxHeight = "none";
  });
  document.querySelectorAll(".program-trigger").forEach((button) => {
    button.setAttribute("aria-expanded", "true");
  });
}

document.querySelectorAll(".program-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (!panel) return;
    if (expanded) {
      panel.style.maxHeight = "0px";
      panel.hidden = true;
    } else {
      panel.hidden = false;
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

const leadMagnetLink = document.getElementById("lead-magnet-link");
if (leadMagnetLink && config.leadMagnetUrl) {
  leadMagnetLink.href = config.leadMagnetUrl;
}

const welcomeSection = document.getElementById("welcome-video");
const welcomeEmbed = document.getElementById("welcome-video-embed");
if (welcomeSection && welcomeEmbed && config.welcomeVideoId) {
  welcomeSection.hidden = false;
  welcomeEmbed.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${config.welcomeVideoId}?rel=0" title="Видео-приветствие Ильи Баринова" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
}

const form = document.getElementById("course-form");
const formSuccess = document.getElementById("form-success");
const submitBtn = document.getElementById("form-submit-btn");

function buildMessage(data) {
  return [
    "Запрос приглашения · Точка опоры",
    `Имя: ${data.get("name") || ""}`,
    `Контакт: ${data.get("contact") || ""}`
  ].join("\n");
}

async function submitViaWeb3Forms(data, message) {
  const key = config.web3formsAccessKey;
  if (!key) return false;

  const body = new FormData();
  body.append("access_key", key);
  body.append("subject", "Заявка: Точка опоры");
  body.append("name", data.get("name") || "");
  body.append("email", data.get("contact") || "");
  body.append("message", message);

  const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
  const json = await res.json();
  return json.success === true;
}

async function submitViaFormSubmit(data, message) {
  const email = config.formSubmitEmail || "info@barinovdao.ru";
  const payload = {
    name: data.get("name") || "",
    email: data.get("contact") || "",
    message,
    _subject: "Заявка: Точка опоры",
    _template: "table"
  };

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  return res.ok && (json.success === true || json.success === "true");
}

function showFormSuccess() {
  if (form) form.hidden = true;
  if (formSuccess) {
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.querySelector('[name="_honey"]')?.value) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const message = buildMessage(data);

    form.classList.add("is-submitting");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";
    }

    let ok = false;
    try {
      ok = await submitViaWeb3Forms(data, message);
      if (!ok) ok = await submitViaFormSubmit(data, message);
    } catch {
      ok = false;
    }

    form.classList.remove("is-submitting");

    if (ok) {
      showFormSuccess();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Оставить заявку";
    }

    const fallback = `https://t.me/vsemaya?text=${encodeURIComponent(message)}`;
    if (window.confirm("Не удалось отправить заявку с сайта. Открыть Telegram с готовым текстом?")) {
      window.open(fallback, "_blank", "noopener,noreferrer");
    }
  });
}
