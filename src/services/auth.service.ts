import { BaseApiService } from './base.service';
import { AxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    userId: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string; 
}

interface RegisterResponse {
    token: string;
    userId: string;
}

export class AuthService extends BaseApiService {
    constructor(queryClient?: QueryClient) {
        super(queryClient);
    }

    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.post<LoginResponse>('/auth/login', data);
            if (response.token) {
                await this.setAuthToken(response.token); // Store token
            }
            return response;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async register(data: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await this.post<RegisterResponse>('/auth/register', data);
            if (response.token) {
                await this.setAuthToken(response.token); // Store token
            }
            return response;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.post('/auth/logout');
            await this.clearAuthToken();
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async getUserProfile(userId: string | number): Promise<any> {
        try {
            return await this.getById('/auth/profile', userId);
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected handleError(error: AxiosError): void {
        console.error('Auth API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        if (error.response?.status === 400) {
            throw new Error('Invalid email or password. Please try again.');
        } else if (error.response?.status === 409) {
            throw new Error('This email is already registered.');
        }
        super.handleError(error);
    }
}