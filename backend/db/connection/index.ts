import mongoose from 'mongoose';

async function connectDb() {
  const uri = process.env.MONGO_URI!;
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDb;
