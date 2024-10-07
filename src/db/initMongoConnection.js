import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = encodeURIComponent(env('MONGODB_PASSWORD'));
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    console.log('MONGODB_USER:', user);

    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

    console.log(`Connecting to MongoDB: ${DB_HOST.replace(password, '***')}`);

    await mongoose.connect(DB_HOST);

    console.log('Mongo connection successfully established!');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB successfully.');
    });
  } catch (error) {
    console.log('Mongodb connection error:', error.message);
    throw error;
  }
};
