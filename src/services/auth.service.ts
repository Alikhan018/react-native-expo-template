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
    username: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    userId: string;
    message: string;
}

interface CompleteProfileData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
}

export class AuthService extends BaseApiService {
    constructor(queryClient?: QueryClient) {
        super(queryClient);
    }

    async login(credentials: { email: string; password: string }) {
        try {
            const response = await this.api.post('/auth/login', credentials);
            const cookie = response.headers['set-cookie'];
            if (!cookie) throw new Error('No auth token received');
            return { token: cookie[0], user: response.data.user };
        } catch (error: any) {
            // Log the error
            console.error('Login error:', error.response?.data);

            // Don't transform the error here - let it pass through to the component
            // so the component can check error.response.data.error === 'Profile incomplete'
            throw error;
        }
    }

    async register(data: RegisterRequest): Promise<RegisterResponse> {
        try {
            console.log(this.api.defaults.baseURL);
            const response = await this.post<RegisterResponse>('/auth/signup', data);
            return response;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }
    async verifyOtp(email: string, otp: string, purpose: string): Promise<{ ok: boolean }> {
        try {
            const response = await this.post<{ ok: boolean }>('/auth/verify-otp', { email, otp, purpose });
            return response;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }
    async completeProfile(email: string, profileData: CompleteProfileData): Promise<{ ok: boolean }> {
        try {
            const response = await this.post<{ ok: boolean }>('/auth/complete-profile', {
                email,
                ...profileData
            });
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

    // src/services/auth.service.ts

    protected handleError(error: AxiosError): void {
        console.error('Auth API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        // DON'T throw generic errors here - let the specific error pass through
        // The calling function needs to handle the specific error response

        // Remove or comment out this section:
        // if (error.response?.status === 400) {
        //     throw new Error('Invalid email or password. Please try again.');
        // } else if (error.response?.status === 409) {
        //     throw new Error('This email is already registered.');
        // }

        // Just call parent handleError or don't throw
        super.handleError(error);
    }
}