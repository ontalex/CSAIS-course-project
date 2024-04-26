@echo off
chcp 65001
echo ">>> Запускаю приложение-сервер;"
echo ">>> Для завершения работы нажмите комбинацию клавиш Ctrl+C;"
npm i && npm run dev
pause