import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE_URI;

const dbUrl = `${database}`;
export const url = { dbUrl };