import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Animated, ImageBackground } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/theme/index';
import { LoadingSpinner, Screen, Text } from '@/components/ui';
import { TouchableOpacity } from 'react-native';
import { APP_DESCRIPTION, APP_NAME, APP_TITLE, features } from '@/constants/landing-page';
import { useAuth } from '@/hooks/useAuth';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
    const { colors, spacing, isDark } = useTheme();
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter();
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <LoadingSpinner size="large" />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 40,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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
            opacity: 0.8,
        },
        content: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.lg,
        },
        header: {
            alignItems: 'center',
        },
        logo: {
            width: 80,
            height: 80,
            borderRadius: 20,
            marginBottom: spacing.md,
        },
        brandName: {
            paddingTop: spacing.sm,
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.text,
            textShadowColor: 'rgba(0,0,0,0.1)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        heroTitle: {
            fontSize: 28,
            fontWeight: '900',
            paddingTop: spacing.sm,
            color: colors.text,
            textAlign: 'center',
            marginBottom: spacing.sm,
        },
        heroSubtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: spacing.lg,
        },
        featuresRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: spacing.md
        },
        featureItem: {
            alignItems: 'center',
            width: width / 4 - spacing.md,
        },
        featureIconContainer: {
            backgroundColor: colors.primary + '30',
            borderRadius: 16,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.sm,
            marginBottom: spacing.xs,
        },
        featureText: {
            fontSize: 12,
            color: colors.text,
            textAlign: 'center',
        },
        ctaContainer: {
            width: '100%',
            padding: spacing.sm,
            boxSizing: 'border-box',
            alignItems: 'center',
        },
        primaryButton: {
            width: '100%',
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: spacing.md,
            alignItems: 'center',
            marginBottom: spacing.sm,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        primaryButtonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        secondaryButton: {
            width: '100%',
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 16,
            paddingVertical: spacing.md,
            alignItems: 'center',
            marginBottom: spacing.md,
        },
        secondaryButtonText: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
        },
        socialContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.sm,
        },
        socialButton: {
            backgroundColor: colors.surface,
            borderRadius: 50,
            padding: spacing.md,
            marginHorizontal: spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
            width: 66,
            height: 66,
            shadowColor: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
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
                source={require('../assets/background-landing.jpg')}
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
                            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Image source={require('../assets/icon.png')} style={styles.logo} />
                        <Text style={styles.brandName}>{APP_NAME}</Text>
                    </View>

                    <View>
                        <Text style={styles.heroTitle}>{APP_TITLE}</Text>
                        <Text style={styles.heroSubtitle}>{APP_DESCRIPTION}</Text>
                        <View style={styles.featuresRow}>
                            {features.map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <View style={styles.featureIconContainer}>
                                        <FontAwesome name={feature.icon} size={20} color={colors.primary} />
                                    </View>
                                    <Text style={styles.featureText}>{feature.text}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.ctaContainer}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.push('/(auth)/signup')}
                        >
                            <Text style={styles.primaryButtonText}>Get Started Free</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push('/(auth)/login')}
                        >
                            <Text style={styles.secondaryButtonText}>Sign In</Text>
                        </TouchableOpacity>
                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton} onPress={() => { /* Google auth */ }}>
                                <FontAwesome name="google" size={24} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton} onPress={() => { /* Apple auth */ }}>
                                <FontAwesome name="apple" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>By continuing, you agree to our</Text>
                            <TouchableOpacity><Text style={styles.footerLink}>Terms</Text></TouchableOpacity>
                            <Text style={styles.footerText}> & </Text>
                            <TouchableOpacity><Text style={styles.footerLink}>Privacy</Text></TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ImageBackground>
        </Screen>
    );
}