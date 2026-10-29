import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexora';

export const dbState = {
  connected: false,
  isUsingFallback: false,
  uri: MONGODB_URI,
  error: null,
};

// In-memory / JSON fallback store for offline development when mongod is not yet launched
const dataDir = path.resolve('server/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export async function connectDB() {
  try {
    console.log(`[DB] Attempting connection to MongoDB at: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    dbState.connected = true;
    dbState.isUsingFallback = false;
    console.log('✅ [DB] Successfully connected to MongoDB Database!');
  } catch (err) {
    dbState.connected = false;
    dbState.isUsingFallback = true;
    dbState.error = err.message;
    console.warn(`⚠️ [DB] Could not connect to local MongoDB (${err.message}).`);
    console.log('⚡ [DB] Active in resilient fallback mode (in-memory & persisted JSON storage).');
    console.log('💡 [DB] To connect to MongoDB Atlas, add your connection string to .env (MONGODB_URI=mongodb+srv://...)');
  }
}

