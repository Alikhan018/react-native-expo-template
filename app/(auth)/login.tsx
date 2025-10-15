import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@theme/index';
import { Screen, Text } from '@/components/ui';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { colors, spacing, isDark } = useTheme();
    const router = useRouter();

    // Form setup with react-hook-form
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Form submission handler
    const onSubmit = async (data: LoginFormData) => {
        try {
            // Simulate login API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Login data:', data);
            router.push('/dashboard'); // Navigate to dashboard after successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        backgroundImage: {
            flex: 1,
            justifyContent: 'center',
        },
        gradientOverlay: {
            ...StyleSheet.absoluteFillObject,
            opacity: 0.85,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.lg,
        },
        formContainer: {
            width: '100%',
            maxWidth: 400,
            backgroundColor: isDark ? colors.surface + 'CC' : '#FFFFFFCC',
            borderRadius: 16,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.primary + '20',
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
        },
        title: {
            fontSize: 24,
            fontWeight: '800',
            color: colors.text,
            textAlign: 'center',
            marginBottom: spacing.sm,
        },
        subtitle: {
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: spacing.lg,
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: spacing.sm,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.border,
        },
        dividerText: {
            fontSize: 12,
            color: colors.textSecondary,
            paddingHorizontal: spacing.sm,
            fontWeight: '600',
        },
        socialContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: spacing.sm,
        },
        socialButton: {
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: spacing.md,
            marginHorizontal: spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: colors.border,
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        footerText: {
            fontSize: 12,
            color: colors.textSecondary,
        },
        footerLink: {
            fontSize: 12,
            color: colors.primary,
            fontWeight: '600',
            marginLeft: spacing.xs,
        },
    });

    return (
        <Screen>
            <ImageBackground
                source={{ uri: 'https://example.com/solar-background.jpg' }} // Replace with actual asset
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={isDark ? ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)'] : ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.3)']}
                    style={styles.gradientOverlay}
                />
                <BlurView intensity={20} style={StyleSheet.absoluteFill} tint={isDark ? 'dark' : 'light'} />
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to manage your solar energy</Text>

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Email"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.email?.message}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Password"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.password?.message}
                                    secureTextEntry
                                />
                            )}
                        />

                        <Button
                            title={isSubmitting ? 'Signing In...' : 'Sign In'}
                            onPress={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            variant="primary"
                        />

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton} onPress={() => { /* Google auth */ }}>
                                <FontAwesome name="google" size={24} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton} onPress={() => { /* Apple auth */ }}>
                                <FontAwesome name="apple" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                <Text style={styles.footerLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ImageBackground>
        </Screen>
    );
}