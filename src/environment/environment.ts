import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
} as const;
