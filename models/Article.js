import mongoose from 'mongoose';

// Статья: многие ко многим с тегами — хранит массив ссылок на теги
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
