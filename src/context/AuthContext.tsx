// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { config } from '@/environment/environment';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    emailVerified: boolean;
    profileComplete: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (token: string, user: User) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const TOKEN_KEY = config.authTokenKey || '@auth_token';
const USER_KEY = config.authUserKey || '@auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const segments = useSegments();

    // Load stored auth data on mount
    useEffect(() => {
        loadStoredAuth();
    }, []);

    // Handle navigation based on auth state
    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inTabsGroup = segments[0] === '(tabs)';

        if (!user && !inAuthGroup) {
            // Redirect to login if not authenticated
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            // Redirect to tabs if authenticated and in auth screens
            router.replace('/(tabs)/');
        }
    }, [user, segments, isLoading]);

    const loadStoredAuth = async () => {
        try {
            const [storedToken, storedUser] = await Promise.all([
                AsyncStorage.getItem(TOKEN_KEY),
                AsyncStorage.getItem(USER_KEY),
            ]);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to load auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (authToken: string, userData: User) => {
        try {
            await Promise.all([
                AsyncStorage.setItem(TOKEN_KEY, authToken),
                AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)),
            ]);
            setToken(authToken);
            setUser(userData);
        } catch (error) {
            console.error('Failed to save auth data:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem(TOKEN_KEY),
                AsyncStorage.removeItem(USER_KEY),
            ]);
            setToken(null);
            setUser(null);
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Failed to clear auth data:', error);
        }
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!user,
                signIn,
                signOut,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
