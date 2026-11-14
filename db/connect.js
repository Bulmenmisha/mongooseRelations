import mongoose from 'mongoose';

// Подключение к MongoDB через Mongoose + обработка событий подключения
export async function connectDB() {
  mongoose.connection.on('connected', () => console.log('Mongoose: подключение к MongoDB установлено'));
  mongoose.connection.on('error', (err) => console.error('Mongoose: ошибка подключения:', err.message));
  mongoose.connection.on('disconnected', () => console.log('Mongoose: соединение закрыто'));

  await mongoose.connect(process.env.MONGO_URI);
}
