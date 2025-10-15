import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyLarge' | 'caption' | 'label';
export type TextColor = 'primary' | 'secondary' | 'text' | 'textSecondary' | 'error' | 'success' | 'warning';

interface CustomTextProps extends RNTextProps {
    variant?: TextVariant;
    color?: TextColor;
    center?: boolean;
    bold?: boolean;
    semiBold?: boolean;
}

export const Text: React.FC<CustomTextProps> = ({
    variant = 'body',
    color = 'text',
    center = false,
    bold = false,
    semiBold = false,
    style,
    children,
    ...props
}) => {
    const { colors } = useTheme();

    const variantStyles = {
        h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
        h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
        h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
        body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
        bodyLarge: { fontSize: 18, fontWeight: '400' as const, lineHeight: 26 },
        caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
        label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
    };

    const colorMap = {
        primary: colors.primary,
        secondary: colors.secondary,
        text: colors.text,
        textSecondary: colors.textSecondary,
        error: colors.error,
        success: colors.success,
        warning: colors.warning,
    };

    const styles = StyleSheet.create({
        text: {
            ...variantStyles[variant],
            color: colorMap[color],
            textAlign: center ? 'center' : 'left',
            fontWeight: bold ? '700' : semiBold ? '600' : variantStyles[variant].fontWeight,
        },
    });

    return (
        <RNText style={[styles.text, style]} {...props}>
            {children}
        </RNText>
    );
};