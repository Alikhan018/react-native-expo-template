import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Platform, Dimensions } from 'react-native';
import { useTheme } from '@theme/index';

interface FABProps {
    icon: React.ReactNode;
    onPress: () => void;
    position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'success' | 'error';
    disabled?: boolean;
    style?: ViewStyle;
}

export const FAB: React.FC<FABProps> = ({
    icon,
    onPress,
    position = 'bottom-right',
    size = 'medium',
    color = 'primary',
    disabled = false,
    style,
}) => {
    const { colors, spacing } = useTheme();
    const { width: screenWidth } = Dimensions.get('window');

    const sizeMap = {
        small: 48,
        medium: 56,
        large: 64,
    };

    const colorMap = {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        error: colors.error,
    };

    const fabSize = sizeMap[size];
    const fabColor = colorMap[color];

    const getPositionStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            position: 'absolute',
            bottom: spacing.lg,
        };

        switch (position) {
            case 'bottom-right':
                return { ...baseStyle, right: spacing.lg };
            case 'bottom-left':
                return { ...baseStyle, left: spacing.lg };
            case 'bottom-center':
                return { ...baseStyle, left: (screenWidth - fabSize) / 2 };
            default:
                return { ...baseStyle, right: spacing.lg };
        }
    };

    const styles = StyleSheet.create({
        fab: {
            ...getPositionStyle(),
            width: fabSize,
            height: fabSize,
            borderRadius: fabSize / 2,
            backgroundColor: fabColor,
            justifyContent: 'center',
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                },
                android: {
                    elevation: 8,
                },
            }),
        },
        disabled: {
            opacity: 0.5,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.fab, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {icon}
        </TouchableOpacity>
    );
};