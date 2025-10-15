import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@theme/index';
import { FontAwesome } from '@expo/vector-icons';
import { IconButton, Screen, Text } from '@/components/common';

export const SettingsScreen: React.FC = () => {
    const { colors, spacing, mode, setMode } = useTheme();

    const styles = StyleSheet.create({
        safeArea: {
            paddingTop: spacing.sm,
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            flex: 1,
            paddingHorizontal: spacing.md,
        },
        scrollContent: {
            paddingTop: spacing.lg,
            paddingBottom: spacing.xl,
        },
        title: {
            paddingTop: spacing.md,
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.text
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.textSecondary,
            textTransform: 'uppercase',
            marginBottom: spacing.sm,
            marginTop: spacing.md,
        },
        option: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: spacing.sm,
            minHeight: 56, // Better touch target
        },
        optionText: {
            fontSize: 16,
            color: colors.text,
            fontWeight: '500',
        },
        selectedOption: {
            backgroundColor: colors.primary,
        },
        selectedText: {
            color: '#FFFFFF',
        },
        checkmark: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        list: {
            display: 'flex',
            gap: spacing.sm
        }
    });

    const options: Array<{ label: string; value: 'light' | 'dark' | 'system', icon: React.ReactNode }> = [
        { label: 'Light Mode', value: 'light', icon: <FontAwesome name="sun-o" size={24} color={colors.text} /> },
        { label: 'Dark Mode', value: 'dark', icon: <FontAwesome name="moon-o" size={24} color={colors.text} /> },
        { label: 'System Default', value: 'system', icon: <FontAwesome name="desktop" size={24} color={colors.text} /> },
    ];

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>

                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.list}>
                    {options.map((option) => (
                        <View style={styles.option} >
                            <Text>{option.label}</Text>
                            <IconButton icon={option.icon} onPress={() => { setMode(option.value) }} />
                        </View>
                    ))}
                </View>
            </View>
        </Screen>
    );
};