import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@theme/index';
import { TouchableOpacity } from 'react-native';
import { Screen, Text } from '@/components/ui';
import { Button } from '@/components/ui';
import { FontAwesome } from '@expo/vector-icons';
import { AuthService } from '@/services/auth.service';

const { width, height } = Dimensions.get('window');

export default function OTPVerificationScreen() {
    const { colors, spacing, isDark } = useTheme();
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();

    // OTP state
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Refs for input fields
    const inputRefs = useRef<TextInput[]>([]);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

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

        // Focus first input
        setTimeout(() => inputRefs.current[0]?.focus(), 500);
    }, []);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    // Handle OTP input
    const handleOtpChange = (value: string, index: number) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all fields are filled
        if (newOtp.every(digit => digit !== '') && index === 5) {
            handleVerify(newOtp.join(''));
        }
    };

    // Handle backspace
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Verify OTP
    const handleVerify = async (otpCode?: string) => {
        const code = otpCode || otp.join('');

        if (code.length !== 6) {
            setError('Please enter complete OTP');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            console.log('Verifying OTP:', code, 'for email:', email);
            const as = new AuthService();
            const response = await as.verifyOtp(email, code, 'signup');
            console.log('OTP verification response:', response);
            if (response.ok) {
                throw new Error('Invalid OTP');
            }
            router.push({ pathname: '/(auth)/complete-profile', params: { email } });
        } catch (err) {
            setError('Invalid OTP. Please try again.');
            // Shake animation on error
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
            ]).start();

            // Clear OTP
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setIsVerifying(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        if (!canResend) return;

        try {
            // Simulate resend OTP API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Resending OTP to:', email);

            // Reset timer
            setTimer(60);
            setCanResend(false);
            setError('');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
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
            marginBottom: spacing.xs,
        },
        emailText: {
            fontSize: 14,
            color: colors.primary,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: spacing.lg,
        },
        otpContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.md,
        },
        otpInput: {
            width: 50,
            height: 60,
            borderWidth: 2,
            borderColor: colors.border,
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
            backgroundColor: colors.background,
        },
        otpInputFilled: {
            borderColor: colors.primary,
            backgroundColor: colors.primary + '10',
        },
        otpInputError: {
            borderColor: '#EF4444',
        },
        errorText: {
            color: '#EF4444',
            fontSize: 12,
            textAlign: 'center',
            marginBottom: spacing.sm,
            minHeight: 18,
        },
        timerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.md,
        },
        timerText: {
            fontSize: 14,
            color: colors.textSecondary,
        },
        resendButton: {
            marginLeft: spacing.xs,
        },
        resendText: {
            fontSize: 14,
            color: colors.primary,
            fontWeight: '600',
        },
        resendTextDisabled: {
            color: colors.textSecondary,
        },
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.md,
        },
        backButtonText: {
            fontSize: 14,
            color: colors.textSecondary,
            marginLeft: spacing.xs,
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
                            transform: [
                                { scale: scaleAnim },
                                { translateX: shakeAnim }
                            ],
                        },
                    ]}
                >
                    <View style={styles.formContainer}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                <FontAwesome name="envelope" size={36} color={colors.primary} />
                            </View>
                        </View>

                        <Text style={styles.title}>Verify Your Email</Text>
                        <Text style={styles.subtitle}>We've sent a verification code to</Text>
                        <Text style={styles.emailText}>{email}</Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        if (ref) inputRefs.current[index] = ref;
                                    }}
                                    style={[
                                        styles.otpInput,
                                        digit && styles.otpInputFilled,
                                        error && styles.otpInputError,
                                    ]}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    selectTextOnFocus
                                />
                            ))}
                        </View>

                        <Text style={styles.errorText}>{error}</Text>

                        <Button
                            title={isVerifying ? 'Verifying...' : 'Verify OTP'}
                            onPress={() => handleVerify()}
                            loading={isVerifying}
                            disabled={isVerifying || otp.some(digit => !digit)}
                            variant="primary"
                        />

                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>
                                {canResend ? "Didn't receive the code?" : `Resend code in ${timer}s`}
                            </Text>
                            {canResend && (
                                <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
                                    <Text style={styles.resendText}>Resend</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <FontAwesome name="arrow-left" size={14} color={colors.textSecondary} />
                            <Text style={styles.backButtonText}>Back to Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ImageBackground>
        </Screen>
    );
}