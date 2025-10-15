import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    authTokenKey: process.env.AUTH_TOKEN_KEY || '@auth_token',
} as const;
