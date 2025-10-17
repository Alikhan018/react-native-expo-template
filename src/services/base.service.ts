import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import { config } from '@/environment/environment';

const API_BASE_URL = config.apiUrl;
const AUTH_TOKEN_KEY = config.authTokenKey || '@auth_token';

export class BaseApiService {
    protected api: AxiosInstance;
    protected queryClient: QueryClient;

    constructor(queryClient?: QueryClient) {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        this.queryClient = queryClient || new QueryClient();

        this.api.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Handle unauthorized: e.g., logout user, redirect to login
                    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
                    // Optionally invalidate queries: this.queryClient.invalidateQueries();
                    // You might want to navigate to login screen here, but since this is service, perhaps emit an event or use a global handler
                }
                return Promise.reject(error);
            }
        );
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.get<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected async getById<T>(url: string, id: string | number, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.get<T>(`${url}/${id}`, config);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.api.delete<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    protected handleError(error: AxiosError): void {
        console.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
    }

    public async setAuthToken(token: string): Promise<void> {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    public async clearAuthToken(): Promise<void> {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    }
}