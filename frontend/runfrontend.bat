@echo off
chcp 65001
echo ">>> Запускаю приложение-клиент;"
echo ">>> Для завершения работы нажмите комбинацию клавиш Ctrl+C;"
start "" http://localhost:5173/admin
npm i && npm run dev
pause