import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components/ui';
import { useTheme } from '@/theme/index';

export default function HomeTabScreen() {
    const { colors, spacing } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: spacing.lg,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.text,
        },
        subtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            marginTop: spacing.xs,
        },
    });

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to SolarMax</Text>
                <Text style={styles.subtitle}>This is your home tab.</Text>
            </View>
        </Screen>
    );
}


