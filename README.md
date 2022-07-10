# Лабораторная работа для Digital Security
## Разработал zxchrnk

В данной работе были рассмотрены уязвимости библиотеки React (XSS через dangerousInnerHtmk) и уязвимость серверной части приложения на Node.js Prototype Pollution

Все зависимости проекта указаны в package.json файлах

## Installation

Для запуска необходима [Node.js](https://nodejs.org/) v16.13.2+ to run.

В репозитории 3 папки
- deploy
- poc
- src

Для разработки служит папка **src** в которой лежат:
- front
- server

Чтобы запустить dev версию нужно установить зависимости из каждой папки (необходимые пакеты)
```sh
cd front
npm install 
```
и 
```sh
cd server
npm install 
```

Для запуска приложения служит папка **deploy**

В папке **poc** лежит один файл poc.md, служащий путиводителем для лабораторной работы 