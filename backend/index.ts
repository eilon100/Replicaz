import * as dotenv from 'dotenv';
import { app } from './app';
import connectDb from './db/connection';
import { requireEnvs } from './utills/requireEnvs';
require('express-async-errors');

dotenv.config({ path: `./env` });

async function main() {
  const requiredEnvs = [
    'PORT',
    'MONGO_URI',
    'SG_API',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];

  requireEnvs(requiredEnvs);

  const { PORT } = process.env;

  await connectDb();
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
}

main();
