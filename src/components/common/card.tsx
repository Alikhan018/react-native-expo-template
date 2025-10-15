import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    Platform,
} from 'react-native';
import { useTheme } from '@theme/index';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    variant = 'elevated',
    padding = 'md',
    style,
}) => {
    const { colors, spacing } = useTheme();

    const paddingMap = {
        none: 0,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
    };

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: paddingMap[padding],
        },
        elevated: {
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
                android: {
                    elevation: 4,
                },
            }),
        },
        outlined: {
            borderWidth: 1,
            borderColor: colors.border,
        },
        filled: {
            backgroundColor: colors.background,
        },
        pressable: {
            opacity: 1,
        },
    });

    const cardStyle = [
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && styles.outlined,
        variant === 'filled' && styles.filled,
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                style={[cardStyle, styles.pressable]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyle}>{children}</View>;
};