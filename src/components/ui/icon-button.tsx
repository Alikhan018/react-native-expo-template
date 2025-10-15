import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

interface IconButtonProps {
    icon: React.ReactNode;
    onPress: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'contained' | 'outlined';
    disabled?: boolean;
    style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onPress,
    size = 'medium',
    variant = 'default',
    disabled = false,
    style,
}) => {
    const { colors, spacing } = useTheme();

    const sizeMap = {
        small: 32,
        medium: 40,
        large: 48,
    };

    const buttonSize = sizeMap[size];

    const styles = StyleSheet.create({
        button: {
            width: buttonSize,
            height: buttonSize,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: buttonSize / 2,
        },
        default: {
            backgroundColor: 'transparent',
        },
        contained: {
            backgroundColor: colors.primary,
        },
        outlined: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
        },
        disabled: {
            opacity: 0.5,
        },
    });

    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'default' && styles.default,
                variant === 'contained' && styles.contained,
                variant === 'outlined' && styles.outlined,
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            {icon}
        </TouchableOpacity>
    );
};