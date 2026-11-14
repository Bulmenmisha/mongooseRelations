import mongoose from 'mongoose';

// Журнал: «многие» в связи один ко многим.
// Каждый журнал хранит ссылку на своего издателя.
const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issueNumber: { type: Number, required: true },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true,
  },
});

const Magazine = mongoose.model('Magazine', magazineSchema);

export default Magazine;
