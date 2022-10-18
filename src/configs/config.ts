import * as dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT ? process.env.PORT : '';
export const mongoURL = process.env.MONGO_URL ? process.env.MONGO_URL : '';

export const jwtSecret = process.env.JWT_SECRET || 'token_test'