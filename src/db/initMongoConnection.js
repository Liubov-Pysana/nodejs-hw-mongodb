import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    // Load environment variables
    const user = env('MONGODB_USER');
    const password = encodeURIComponent(env('MONGODB_PASSWORD'));  // Encode special characters in the password
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    // Log the MONGODB_USER environment variable
    console.log('MONGODB_USER:', user);

    // Construct MongoDB connection string
    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

    console.log(`Connecting to MongoDB: ${DB_HOST.replace(password, '***')}`);  // Log the connection string without exposing the password

    // Connect to MongoDB
    await mongoose.connect(DB_HOST);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Mongodb connection error:', error.message);
    throw error;
  }
};
