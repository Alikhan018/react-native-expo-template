import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '@theme/index';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';

// Inner component that has access to theme
function RootLayoutNav() {
    const { isDark, colors } = useTheme();

    return (
        <>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                    animation: 'fade',
                }}
            >
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}

// Root component that provides theme
export default function RootLayout() {
    return (
        <AuthProvider>
            <GestureHandlerRootView style={styles.container}>
                <ThemeProvider>
                    <RootLayoutNav />
                </ThemeProvider>
            </GestureHandlerRootView>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});