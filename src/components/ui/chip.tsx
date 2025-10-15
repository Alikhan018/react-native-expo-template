import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from '@theme/index';

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    onDelete?: () => void;
    variant?: 'filled' | 'outlined';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'default';
    size?: 'small' | 'medium';
    leftIcon?: React.ReactNode;
    disabled?: boolean;
    style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
    label,
    selected = false,
    onPress,
    onDelete,
    variant = 'filled',
    color = 'default',
    size = 'medium',
    leftIcon,
    disabled = false,
    style,
}) => {
    const { colors, spacing } = useTheme();

    const colorMap = {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        error: colors.error,
        default: colors.surface,
    };

    const chipColor = colorMap[color];
    const isDefault = color === 'default';

    const styles = StyleSheet.create({
        chip: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: size === 'small' ? spacing.sm : spacing.md,
            paddingVertical: size === 'small' ? spacing.xs : spacing.sm,
            borderRadius: 16,
            alignSelf: 'flex-start',
        },
        filled: {
            backgroundColor: selected || !isDefault ? chipColor : colors.surface,
        },
        outlined: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: chipColor,
        },
        disabled: {
            opacity: 0.5,
        },
        label: {
            fontSize: size === 'small' ? 12 : 14,
            fontWeight: '500',
            color: selected && variant === 'filled' && !isDefault
                ? '#FFFFFF'
                : isDefault
                    ? colors.text
                    : variant === 'outlined'
                        ? chipColor
                        : colors.text,
        },
        leftIcon: {
            marginRight: spacing.xs,
        },
        deleteIcon: {
            marginLeft: spacing.xs,
            fontSize: 16,
        },
    });

    return (
        <TouchableOpacity
            style={[
                styles.chip,
                variant === 'filled' && styles.filled,
                variant === 'outlined' && styles.outlined,
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || !onPress}
            activeOpacity={0.7}
        >
            {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}

            <Text style={styles.label}>{label}</Text>

            {onDelete && (
                <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.deleteIcon}>✕</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};