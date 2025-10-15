import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

interface OutlinedButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'success';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    style?: ViewStyle;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    color = 'primary',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    style,
}) => {
    const { colors, spacing } = useTheme();

    const colorMap = {
        primary: colors.primary,
        secondary: colors.secondary,
        error: colors.error,
        success: colors.success,
    };

    const buttonColor = colorMap[color];

    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.md,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: buttonColor,
            backgroundColor: 'transparent',
            minHeight: 48,
            width: fullWidth ? '100%' : 'auto',
        },
        disabled: {
            opacity: 0.5,
        },
        text: {
            color: buttonColor,
            fontSize: 16,
            fontWeight: '600',
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
                <ActivityIndicator color={buttonColor} />
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