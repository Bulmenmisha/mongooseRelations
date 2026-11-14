import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/connect.js';
import { Publisher, Magazine, Tag, Article } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('ДЗ 13: Mongoose. Маршруты: POST /seed, GET /magazines, GET /publishers/:id/magazines, GET /articles, GET /tags');
});

// Заполнить базу тестовыми данными, чтобы увидеть связи в действии
app.post('/seed', async (req, res) => {
  try {
    await Promise.all([Publisher.deleteMany(), Magazine.deleteMany(), Tag.deleteMany(), Article.deleteMany()]);

    // Один ко многим: 1 издатель -> 2 журнала
    const publisher = await Publisher.create({ name: 'Axel Springer', location: 'Berlin' });
    await Magazine.create([
      { title: 'Auto Bild', issueNumber: 12, publisher: publisher._id },
      { title: 'Computer Bild', issueNumber: 7, publisher: publisher._id },
    ]);

    // Многие ко многим: статьи <-> теги (ссылки хранятся с обеих сторон)
    const [nodeTag, jsTag] = await Tag.create([{ name: 'nodejs' }, { name: 'javascript' }]);
    const article1 = await Article.create({ title: 'Введение в Node.js', content: '...', tags: [nodeTag._id, jsTag._id] });
    const article2 = await Article.create({ title: 'Замыкания в JS', content: '...', tags: [jsTag._id] });

    nodeTag.articles = [article1._id];
    jsTag.articles = [article1._id, article2._id];
    await Promise.all([nodeTag.save(), jsTag.save()]);

    res.status(201).json({ message: 'Тестовые данные добавлены' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Журналы вместе с данными издателя
app.get('/magazines', async (req, res) => {
  try {
    res.json(await Magazine.find().populate('publisher'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Все журналы конкретного издателя
app.get('/publishers/:id/magazines', async (req, res) => {
  try {
    res.json(await Magazine.find({ publisher: req.params.id }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Статьи с тегами
app.get('/articles', async (req, res) => {
  try {
    res.json(await Article.find().populate('tags', 'name'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Теги со статьями
app.get('/tags', async (req, res) => {
  try {
    res.json(await Tag.find().populate('articles', 'title'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));
} catch (error) {
  console.error('Сервер не запущен: нет подключения к MongoDB:', error.message);
  process.exit(1);
}
