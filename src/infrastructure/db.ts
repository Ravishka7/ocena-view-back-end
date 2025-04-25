import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      throw new Error('MongoDB URL is not defined');
    }
    
    await mongoose.connect(MONGODB_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('MongoDB connection error');
    console.log(error);
  }
};

export default connectDB;