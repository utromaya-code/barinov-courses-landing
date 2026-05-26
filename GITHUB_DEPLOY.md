# Деплой на GitHub Pages

## 1. Создать репозиторий

1. [github.com/new](https://github.com/new)
2. Имя: **`barinov-courses-landing`**
3. Public, без README (он уже в папке проекта)
4. **Create repository**

## 2. Запушить из папки проекта

```bash
cd "/Users/poslednijgeroj/Library/Mobile Documents/com~apple~CloudDocs/barinov-courses-landing"

git init
git add .
git commit -m "Онлайн-курсы: йога и Точка опоры"
git branch -M main
git remote add origin https://github.com/utromaya-code/barinov-courses-landing.git
git push -u origin main
```

При запросе пароля используйте **Personal Access Token** (не пароль от аккаунта).

## 3. Включить Pages

**Repository → Settings → Pages**

- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)**
- Save

Через 1–3 минуты:

- https://utromaya-code.github.io/barinov-courses-landing/
- https://utromaya-code.github.io/barinov-courses-landing/barinov-yoga.html
- https://utromaya-code.github.io/barinov-courses-landing/tochka-opory.html

## Связь с ретритом

В футерах курсов ссылки на ретрит ведут на  
`https://utromaya-code.github.io/qigong-retreat-landing/` — репозитории разделены намеренно.
