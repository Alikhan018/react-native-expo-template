import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme/index';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
}) => {
    const { colors, spacing } = useTheme();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: variant === 'primary' ? colors.primary : colors.secondary,
            padding: spacing.md,
            borderRadius: 8,
            alignItems: 'center',
        },
        disabled: {
            opacity: 0.5,
        },
        text: {
            color: colors.background,
            fontSize: 16,
            fontWeight: '600',
        },
    });

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={colors.background} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};