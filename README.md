# ДЗ 13: Mongoose, схемы и связи

## Структура
```
db/connect.js        подключение Mongoose + события connected / error
models/Publisher.js  издатель (name, location)
models/Magazine.js   журнал (title, issueNumber, publisher -> Publisher)  — один ко многим
models/Tag.js        тег (name, articles -> [Article])                    — многие ко многим
models/Article.js    статья (title, content, tags -> [Tag])
models/index.js      экспорт всех моделей
app.js               Express сервер
```

## Запуск
1. Запусти локальный MongoDB (`mongod`).
2. ```bash
   npm install
   node app.js
   ```
   В консоли должно появиться `Mongoose: подключение к MongoDB установлено`.

## Проверка связей
```bash
curl -X POST localhost:3000/seed     # тестовые данные
curl localhost:3000/magazines        # журналы + издатель (populate)
curl localhost:3000/articles         # статьи + теги
curl localhost:3000/tags             # теги + статьи
```
