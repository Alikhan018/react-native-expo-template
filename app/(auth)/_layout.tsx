import { Stack } from 'expo-router';
import { useTheme } from '@theme/index';

export default function AuthLayout() {
    const { colors } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.background,
                },
                // Auth screens usually have these animations
                animation: 'slide_from_right',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            {/* Login Screen */}
            <Stack.Screen
                name="login"
                options={{
                    title: 'Sign In',
                }}
            />

            {/* Register Screen */}
            <Stack.Screen
                name="register"
                options={{
                    title: 'Create Account',
                }}
            />

            {/* Forgot Password */}
            <Stack.Screen
                name="forgot-password"
                options={{
                    title: 'Reset Password',
                    presentation: 'modal',
                }}
            />

            {/* OTP Verification */}
            <Stack.Screen
                name="verify-otp"
                options={{
                    title: 'Verify Code',
                    // Prevent going back
                    gestureEnabled: false,
                }}
            />
        </Stack>
    );
}