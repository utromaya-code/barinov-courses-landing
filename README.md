# Онлайн-курсы Ильи Баринова

Единый стиль BarinovDao: [`barinov-brand.css`](barinov-brand.css) — Cream, Navy `#002B49`, Teal `#00A3AD`, Playfair Display + Montserrat.

Отдельный репозиторий для лендингов **онлайн-курсов** (йога, «Точка опоры»).  
Ретриты и Дахаб — в [qigong-retreat-landing](https://github.com/utromaya-code/qigong-retreat-landing).

## Страницы

| Файл | Описание |
|------|----------|
| [index.html](index.html) | Хаб со ссылками на курсы |
| [barinov-yoga.html](barinov-yoga.html) | Йога онлайн |
| [tochka-opory.html](tochka-opory.html) | Курс «Точка опоры» |
| [docs/barinovdao-visual-strategy.html](docs/barinovdao-visual-strategy.html) | Презентация: стратегия единого стиля для barinovdao.ru |

### Настройка заявок и лид-магнита

Файл `tochka-opory-config.js`:

- `formSubmitEmail` — почта для FormSubmit (заявки с формы на сайте).
- `web3formsAccessKey` — опционально, ключ с [web3forms.com](https://web3forms.com).
- `leadMagnetUrl` — ссылка на бесплатную практику / Telegram-бот.
- `welcomeVideoId` — ID ролика YouTube для блока приветствия.

## GitHub Pages

После push: **Settings → Pages → Deploy from branch `main` / root**.

Сайт: `https://utromaya-code.github.io/barinov-courses-landing/`

Подробнее: [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md).
