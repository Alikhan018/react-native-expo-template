import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@theme/index';
import { TouchableOpacity } from 'react-native';
import { Screen, Text } from '@/components/ui';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { FontAwesome } from '@expo/vector-icons';
import { AuthService } from '@/services/auth.service';

const { width, height } = Dimensions.get('window');

type ProfileFormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
};

export default function CompleteProfileScreen() {
    const { colors, spacing, isDark } = useTheme();
    const router = useRouter();
    const { email, fromLogin } = useLocalSearchParams<{ email: string; fromLogin?: string }>();
    const [showAlert, setShowAlert] = useState(false);

    // Form setup with react-hook-form
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            city: '',
            province: ''
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

        // Show alert if coming from login
        if (fromLogin === 'true') {
            setTimeout(() => {
                Alert.alert(
                    'Complete Your Profile',
                    'Please complete your profile to access the dashboard.',
                    [{ text: 'OK' }]
                );
            }, 500);
        }
    }, [fromLogin]);

    // Form submission handler
    const onSubmit = async (data: ProfileFormData) => {
        try {
            console.log('Completing profile for:', email, data);

            // Call API to complete profile
            const authService = new AuthService();
            const response = await authService.completeProfile(email, data);

            console.log('Profile completed:', response);

            if (fromLogin === 'true') {
                router.push('/dashboard');
            } else {
                // If coming from registration, go to success page
                router.push({
                    pathname: '/(auth)/registration-success',
                    params: { email }
                });
            }
        } catch (error) {
            console.error('Profile completion error:', error);
            Alert.alert(
                'Error',
                'Failed to complete profile. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        backgroundImage: {
            flex: 1,
        },
        gradientOverlay: {
            ...StyleSheet.absoluteFillObject,
            opacity: 0.85,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
            padding: spacing.lg,
        },
        formContainer: {
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
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
            marginVertical: spacing.lg,
        },
        iconContainer: {
            alignItems: 'center',
            marginBottom: spacing.md,
        },
        iconCircle: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
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
        sectionTitle: {
            fontSize: 16,
            fontWeight: '700',
            color: colors.text,
            marginTop: spacing.md,
            marginBottom: spacing.sm,
        },
        row: {
            flexDirection: 'row',
            gap: spacing.sm,
        },
        halfWidth: {
            flex: 1,
        },
        skipButton: {
            marginTop: spacing.sm,
            alignItems: 'center',
        },
        skipText: {
            fontSize: 14,
            color: colors.textSecondary,
            textDecorationLine: 'underline',
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

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        }}
                    >
                        <View style={styles.formContainer}>
                            <View style={styles.iconContainer}>
                                <View style={styles.iconCircle}>
                                    <FontAwesome name="user" size={36} color={colors.primary} />
                                </View>
                            </View>

                            <Text style={styles.title}>Complete Your Profile</Text>
                            <Text style={styles.subtitle}>
                                {fromLogin === 'true'
                                    ? 'Complete your profile to access the dashboard'
                                    : 'Tell us more about yourself to get started'}
                            </Text>

                            {/* Personal Information */}
                            <Text style={styles.sectionTitle}>Personal Information</Text>

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="firstName"
                                        rules={{ required: 'First name is required' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="First Name"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.firstName?.message}
                                                autoCapitalize="words"
                                            />
                                        )}
                                    />
                                </View>

                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Last Name"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.lastName?.message}
                                                autoCapitalize="words"
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <Controller
                                control={control}
                                name="phoneNumber"
                                rules={{
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: 'Please enter a valid 10-digit phone number',
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Phone Number"
                                        value={value}
                                        onChangeText={onChange}
                                        error={errors.phoneNumber?.message}
                                        keyboardType="phone-pad"
                                        placeholder="1234567890"
                                    />
                                )}
                            />

                            {/* Address Information */}
                            <Text style={styles.sectionTitle}>Address</Text>

                            <Controller
                                control={control}
                                name="address"
                                rules={{ required: 'Address is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Street Address"
                                        value={value}
                                        onChangeText={onChange}
                                        error={errors.address?.message}
                                        placeholder="123 Main St"
                                    />
                                )}
                            />

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="city"
                                        rules={{ required: 'City is required' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="City"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.city?.message}
                                                autoCapitalize="words"
                                            />
                                        )}
                                    />
                                </View>

                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="province"
                                        rules={{ required: 'Province is required' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Province"
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.province?.message}
                                                autoCapitalize="characters"
                                                placeholder="CA"
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <Button
                                title={isSubmitting ? 'Completing Profile...' : 'Complete Profile'}
                                onPress={handleSubmit(onSubmit)}
                                loading={isSubmitting}
                                disabled={isSubmitting}
                                variant="primary"
                            />

                            {fromLogin !== 'true' && (
                                <TouchableOpacity
                                    style={styles.skipButton}
                                    onPress={() => router.push({
                                        pathname: '/(auth)/registration-success',
                                        params: { email }
                                    })}
                                >
                                    <Text style={styles.skipText}>Skip for now</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </Animated.View>
                </ScrollView>
            </ImageBackground>
        </Screen>
    );
}