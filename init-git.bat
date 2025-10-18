@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════
echo   Инициализация Git репозитория для проекта "ХОГВАРДС"
echo ═══════════════════════════════════════════════════════════
echo.

REM Проверка наличия Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git не установлен!
    echo.
    echo Пожалуйста, установите Git:
    echo 1. Скачайте с https://git-scm.com/download/win
    echo 2. Установите с настройками по умолчанию
    echo 3. Перезапустите терминал
    echo 4. Запустите этот файл снова
    echo.
    pause
    exit /b 1
)

echo ✅ Git установлен
git --version
echo.

REM Проверка, не инициализирован ли уже Git
if exist .git (
    echo ⚠️  Git репозиторий уже инициализирован
    echo.
    choice /C YN /M "Хотите продолжить и добавить новые файлы"
    if errorlevel 2 exit /b 0
) else (
    echo 📦 Инициализирую Git репозиторий...
    git init
    if errorlevel 1 (
        echo ❌ Ошибка инициализации Git
        pause
        exit /b 1
    )
    echo ✅ Git репозиторий инициализирован
    echo.
)

REM Проверка конфигурации пользователя
git config user.name >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Git пользователь не настроен
    echo.
    set /p username="Введите ваше имя: "
    set /p email="Введите ваш email: "
    git config --global user.name "%username%"
    git config --global user.email "%email%"
    echo ✅ Пользователь настроен
    echo.
)

echo 📁 Добавляю файлы в индекс...
git add .
if errorlevel 1 (
    echo ❌ Ошибка добавления файлов
    pause
    exit /b 1
)
echo ✅ Все файлы добавлены
echo.

echo 📝 Создаю первый коммит...
git commit -m "Initial commit: School website HOGWARTS with student management system" -m "Features:" -m "- Student management page with form validation" -m "- Group management system" -m "- Vuex store integration" -m "- localStorage persistence" -m "- Responsive design" -m "- Complete documentation"
if errorlevel 1 (
    echo ⚠️  Возможно, коммит уже был создан или нет изменений
) else (
    echo ✅ Первый коммит создан
)
echo.

echo 📊 История коммитов:
git log --oneline -n 5
echo.

echo 📈 Статистика проекта:
echo Количество файлов в репозитории:
git ls-files | find /c /v ""
echo.

echo ═══════════════════════════════════════════════════════════
echo   🎉 Git репозиторий успешно создан!
echo ═══════════════════════════════════════════════════════════
echo.
echo Следующие шаги:
echo.
echo 1️⃣  Создайте репозиторий на GitHub/GitLab/Bitbucket
echo.
echo 2️⃣  Для отправки на GitHub выполните:
echo    git remote add origin https://github.com/ваш-username/school-website.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3️⃣  Для GitLab:
echo    git remote add origin https://gitlab.com/ваш-username/school-website.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4️⃣  Для Bitbucket:
echo    git remote add origin https://bitbucket.org/ваш-username/school-website.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📚 Подробную инструкцию см. в файле: GIT_SETUP_INSTRUCTIONS.md
echo.
pause

