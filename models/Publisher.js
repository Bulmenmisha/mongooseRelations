import mongoose from 'mongoose';

// Издатель: «один» в связи один ко многим
const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
});

const Publisher = mongoose.model('Publisher', publisherSchema);

export default Publisher;
