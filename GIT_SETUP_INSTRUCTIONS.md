# 📦 Инструкция по созданию Git репозитория для проекта "ХОГВАРДС"

## ⚠️ Git не установлен

В вашей системе не установлен Git. Следуйте инструкциям ниже для установки и создания репозитория.

---

## 🔧 Шаг 1: Установка Git

### Для Windows:

#### Вариант 1: Скачать с официального сайта
1. Перейдите на сайт: https://git-scm.com/download/win
2. Скачайте установщик (64-bit или 32-bit)
3. Запустите установщик
4. Следуйте инструкциям установщика:
   - ✅ Используйте настройки по умолчанию
   - ✅ Выберите "Git from the command line and also from 3rd-party software"
   - ✅ Выберите "Use Windows' default console window"

#### Вариант 2: Через Chocolatey (если установлен)
```powershell
choco install git
```

#### Вариант 3: Через Winget
```powershell
winget install --id Git.Git -e --source winget
```

### После установки:

Перезапустите PowerShell или Command Prompt и проверьте установку:
```bash
git --version
```

Вы должны увидеть что-то вроде: `git version 2.42.0.windows.1`

---

## ⚙️ Шаг 2: Настройка Git (первый раз)

Если вы используете Git впервые, настройте свое имя и email:

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

Пример:
```bash
git config --global user.name "Ivan Ivanov"
git config --global user.email "ivan@example.com"
```

---

## 📦 Шаг 3: Создание Git репозитория

После установки Git, выполните следующие команды в корневой папке проекта:

### 3.1. Перейдите в папку проекта:
```bash
cd C:\Users\Zver\school-website
```

### 3.2. Инициализируйте Git репозиторий:
```bash
git init
```

Вы увидите: `Initialized empty Git repository in C:/Users/Zver/school-website/.git/`

### 3.3. Проверьте статус файлов:
```bash
git status
```

### 3.4. Добавьте все файлы в индекс:
```bash
git add .
```

### 3.5. Создайте первый коммит:
```bash
git commit -m "Initial commit: School website HOGWARTS with student management system"
```

### 3.6. Проверьте историю коммитов:
```bash
git log --oneline
```

---

## 🌐 Шаг 4: Создание удаленного репозитория (опционально)

Если вы хотите сохранить проект на GitHub, GitLab или Bitbucket:

### GitHub:

1. **Создайте репозиторий на GitHub:**
   - Перейдите на https://github.com
   - Нажмите "New repository"
   - Название: `school-website` или `hogwarts-school`
   - Описание: "School website management system with Vue.js and Vuex"
   - Выберите: Public или Private
   - НЕ создавайте README, .gitignore, license (они уже есть)
   - Нажмите "Create repository"

2. **Свяжите локальный репозиторий с GitHub:**
   ```bash
   git remote add origin https://github.com/ваш-username/school-website.git
   git branch -M main
   git push -u origin main
   ```

### GitLab:

1. Создайте проект на https://gitlab.com
2. Выполните команды:
   ```bash
   git remote add origin https://gitlab.com/ваш-username/school-website.git
   git branch -M main
   git push -u origin main
   ```

### Bitbucket:

1. Создайте репозиторий на https://bitbucket.org
2. Выполните команды:
   ```bash
   git remote add origin https://bitbucket.org/ваш-username/school-website.git
   git branch -M main
   git push -u origin main
   ```

---

## 📋 Список файлов в проекте

После выполнения `git add .` будут добавлены следующие файлы:

### Основные файлы:
```
✅ index.html
✅ package.json
✅ package-lock.json
✅ vite.config.js
✅ README.md
✅ INSTALL.md
✅ .gitignore
```

### Новые файлы документации:
```
✅ STUDENT_PAGE_GUIDE.md
✅ IMPLEMENTATION_REPORT.md
✅ GIT_SETUP_INSTRUCTIONS.md
```

### Исходный код:
```
src/
├── ✅ main.js
├── ✅ App.vue
├── ✅ style.css
├── components/
│   ├── ✅ Sidebar.vue
│   ├── ✅ FormInput.vue (новый)
│   ├── ✅ DatePicker.vue (новый)
│   ├── ✅ GenderSelector.vue (новый)
│   ├── ✅ ClassSelector.vue (новый)
│   ├── ✅ AddStudentModal.vue
│   ├── ✅ EditGroupModal.vue
│   ├── ✅ StudentSelectionModal.vue
│   ├── ✅ Home.vue
│   ├── ✅ About.vue
│   ├── ✅ News.vue
│   ├── ✅ Events.vue
│   └── ✅ Contact.vue
└── views/
    ├── ✅ GroupsPage.vue
    ├── ✅ GroupDetailsPage.vue
    ├── ✅ CreateGroupPage.vue
    └── ✅ AddStudentPage.vue (новый)
```

### Исключенные файлы (через .gitignore):
```
❌ node_modules/
❌ dist/
❌ *.log
❌ .env
```

---

## 🔄 Полезные Git команды

### Просмотр изменений:
```bash
# Посмотреть статус
git status

# Посмотреть изменения
git diff

# Посмотреть историю
git log
git log --oneline --graph --all
```

### Работа с коммитами:
```bash
# Добавить конкретный файл
git add src/components/FormInput.vue

# Добавить все файлы
git add .

# Создать коммит
git commit -m "Описание изменений"

# Изменить последний коммит
git commit --amend
```

### Работа с ветками:
```bash
# Посмотреть ветки
git branch

# Создать новую ветку
git branch feature/new-feature

# Переключиться на ветку
git checkout feature/new-feature

# Создать и переключиться
git checkout -b feature/new-feature

# Слить ветку
git merge feature/new-feature
```

### Работа с удаленным репозиторием:
```bash
# Посмотреть удаленные репозитории
git remote -v

# Отправить изменения
git push

# Получить изменения
git pull

# Клонировать репозиторий
git clone https://github.com/username/repository.git
```

---

## 📝 Рекомендуемая структура коммитов

### Формат сообщения коммита:
```
<тип>: <краткое описание>

<подробное описание (опционально)>
```

### Типы коммитов:
- `feat`: Новая функциональность
- `fix`: Исправление бага
- `docs`: Изменения в документации
- `style`: Форматирование, отступы (не влияет на код)
- `refactor`: Рефакторинг кода
- `test`: Добавление тестов
- `chore`: Обновление зависимостей, конфигурации

### Примеры хороших коммитов:
```bash
git commit -m "feat: add student creation page with form validation"
git commit -m "fix: correct date picker validation for students"
git commit -m "docs: add user guide for student management"
git commit -m "style: format code with prettier"
git commit -m "refactor: extract form components into separate files"
```

---

## 🎯 Готовый скрипт для быстрой инициализации

Создайте файл `init-git.bat` с содержимым:

```batch
@echo off
echo Инициализация Git репозитория...

git init
echo ✅ Git репозиторий инициализирован

git add .
echo ✅ Все файлы добавлены

git commit -m "Initial commit: School website HOGWARTS with student management system"
echo ✅ Первый коммит создан

echo.
echo 🎉 Git репозиторий успешно создан!
echo.
echo Для отправки на GitHub выполните:
echo git remote add origin https://github.com/ваш-username/school-website.git
echo git branch -M main
echo git push -u origin main

pause
```

Затем просто запустите `init-git.bat`

---

## ❓ Часто задаваемые вопросы

### Q: Нужно ли коммитить node_modules?
A: Нет! Они уже в .gitignore и будут установлены через `npm install`.

### Q: Как отменить последний коммит?
A: `git reset --soft HEAD~1` (сохранит изменения) или `git reset --hard HEAD~1` (удалит изменения)

### Q: Как посмотреть, что именно изменилось?
A: `git diff` для непроиндексированных изменений, `git diff --staged` для проиндексированных

### Q: Как проигнорировать файл, который уже в репозитории?
A: `git rm --cached filename` затем добавьте в .gitignore

### Q: Как создать релиз?
A: `git tag -a v1.0.0 -m "Release version 1.0.0"` затем `git push origin v1.0.0`

---

## 🔒 .gitignore объяснение

Ваш `.gitignore` уже настроен правильно. Он исключает:

- ❌ `node_modules/` - зависимости (устанавливаются через npm)
- ❌ `dist/` - билд файлы (генерируются автоматически)
- ❌ `*.log` - логи
- ❌ `.env` - переменные окружения (могут содержать секреты)
- ❌ `.DS_Store` - системные файлы macOS
- ❌ `.vscode/*` - настройки редактора (кроме extensions.json)

---

## 📊 Статистика проекта

После инициализации Git, вы можете посмотреть статистику:

```bash
# Количество коммитов
git rev-list --count HEAD

# Количество файлов
git ls-files | wc -l

# Статистика по авторам
git shortlog -sn

# Размер репозитория
git count-objects -vH
```

---

## 🎉 Готово!

После выполнения всех шагов ваш проект будет под контролем версий Git!

**Следующие шаги:**
1. ✅ Установите Git (если еще не установлен)
2. ✅ Настройте имя и email
3. ✅ Инициализируйте репозиторий
4. ✅ Создайте первый коммит
5. ✅ (Опционально) Отправьте на GitHub/GitLab

---

**Дата создания**: 18 октября 2025  
**Проект**: School Website "ХОГВАРДС"  
**Версия**: 1.0.0

