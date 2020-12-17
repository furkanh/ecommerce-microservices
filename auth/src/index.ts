import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY should be added as an environment variable');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI should be added as an environment variable');
  }
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
  }
  catch (err){
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listenin on port 3000");
  });
};

start();