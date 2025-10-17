import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import { Platform, View } from 'react-native';
import { LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
    const { colors, spacing } = useTheme();
    const { isLoading, isAuthenticated } = useAuth();

    // Show loading while checking auth
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LoadingSpinner size='large' />
            </View>
        );
    }

    // This will be handled by AuthProvider navigation,
    // but adding as extra safety
    if (!isAuthenticated) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                // Tab bar styling
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingTop: spacing.xs,
                    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },

                // Header styling
                headerShown: false, // Usually hide for custom headers
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerShadowVisible: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="compass" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="bell-o" size={size} color={color} />
                    ),
                    tabBarBadge: 3
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-o" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}