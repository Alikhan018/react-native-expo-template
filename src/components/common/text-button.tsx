
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

interface TextButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'success' | 'text';
    size?: 'small' | 'medium' | 'large';
    underline?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    style?: ViewStyle;
}

export const TextButton: React.FC<TextButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    color = 'primary',
    size = 'medium',
    underline = false,
    icon,
    iconPosition = 'left',
    style,
}) => {
    const { colors, spacing } = useTheme();

    const colorMap = {
        primary: colors.primary,
        secondary: colors.secondary,
        error: colors.error,
        success: colors.success,
        text: colors.text,
    };

    const sizeMap = {
        small: 14,
        medium: 16,
        large: 18,
    };

    const buttonColor = colorMap[color];
    const fontSize = sizeMap[size];

    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.xs,
        },
        disabled: {
            opacity: 0.5,
        },
        text: {
            color: buttonColor,
            fontSize,
            fontWeight: '600',
            textDecorationLine: underline ? 'underline' : 'none',
        },
        iconLeft: {
            marginRight: spacing.xs,
        },
        iconRight: {
            marginLeft: spacing.xs,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator size="small" color={buttonColor} />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <React.Fragment>{icon}</React.Fragment>
                    )}
                    <Text style={styles.text}>{title}</Text>
                    {icon && iconPosition === 'right' && (
                        <React.Fragment>{icon}</React.Fragment>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};