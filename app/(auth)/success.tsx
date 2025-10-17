import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@theme/index';
import { Screen, Text } from '@/components/ui';
import { Button } from '@/components/ui';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function RegistrationSuccessScreen() {
    const { colors, spacing, isDark } = useTheme();
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const checkAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation
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

        // Success check animation
        setTimeout(() => {
            Animated.parallel([
                Animated.spring(checkAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 300);
    }, []);

    const handleGoToLogin = () => {
        router.push('/(auth)/login');
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

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
            padding: spacing.xl,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.primary + '20',
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
            alignItems: 'center',
        },
        iconContainer: {
            alignItems: 'center',
            marginBottom: spacing.lg,
        },
        iconCircle: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#10B981' + '20',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 4,
            borderColor: '#10B981',
        },
        checkIcon: {
            position: 'absolute',
        },
        title: {
            fontSize: 28,
            fontWeight: '800',
            color: colors.text,
            textAlign: 'center',
            marginBottom: spacing.sm,
        },
        subtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: spacing.xs,
            lineHeight: 24,
        },
        emailText: {
            fontSize: 16,
            color: colors.primary,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: spacing.lg,
        },
        infoBox: {
            width: '100%',
            backgroundColor: colors.primary + '10',
            borderRadius: 12,
            padding: spacing.md,
            marginBottom: spacing.lg,
            borderWidth: 1,
            borderColor: colors.primary + '30',
        },
        infoText: {
            fontSize: 14,
            color: colors.text,
            textAlign: 'center',
            lineHeight: 20,
        },
        buttonContainer: {
            width: '100%',
            gap: spacing.sm,
        },
        featuresList: {
            width: '100%',
            marginBottom: spacing.lg,
        },
        featureItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.sm,
        },
        featureIcon: {
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.sm,
        },
        featureText: {
            flex: 1,
            fontSize: 14,
            color: colors.text,
        },
    });

    return (
        <Screen>
            <ImageBackground
                source={{ uri: 'https://example.com/solar-background.jpg' }}
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
                        <View style={styles.iconContainer}>
                            <Animated.View
                                style={[
                                    styles.iconCircle,
                                    {
                                        transform: [
                                            { rotate: rotateInterpolate },
                                            { scale: checkAnim }
                                        ],
                                    }
                                ]}
                            >
                                <FontAwesome
                                    name="check"
                                    size={56}
                                    color="#10B981"
                                    style={styles.checkIcon}
                                />
                            </Animated.View>
                        </View>

                        <Text style={styles.title}>Account Created!</Text>
                        <Text style={styles.subtitle}>
                            Your account has been successfully created
                        </Text>
                        <Text style={styles.emailText}>{email}</Text>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                Welcome to App! You can now log in to access your dashboard and start managing your profile.
                            </Text>
                        </View>

                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <FontAwesome name="dashboard" size={12} color={colors.primary} />
                                </View>
                                <Text style={styles.featureText}>
                                    Monitor your solar energy production
                                </Text>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <FontAwesome name="bar-chart" size={12} color={colors.primary} />
                                </View>
                                <Text style={styles.featureText}>
                                    Track your energy savings
                                </Text>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <FontAwesome name="bell" size={12} color={colors.primary} />
                                </View>
                                <Text style={styles.featureText}>
                                    Get real-time notifications
                                </Text>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <FontAwesome name="cog" size={12} color={colors.primary} />
                                </View>
                                <Text style={styles.featureText}>
                                    Manage your system settings
                                </Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Go to Login"
                                onPress={handleGoToLogin}
                                variant="primary"
                            />
                        </View>
                    </View>
                </Animated.View>
            </ImageBackground>
        </Screen>
    );
}