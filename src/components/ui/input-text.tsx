import React, { useState } from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useTheme } from '@theme/index';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: object;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    containerStyle,
    secureTextEntry,
    style,
    ...props
}) => {
    const { colors, spacing } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const showPasswordToggle = secureTextEntry;
    const actualSecureTextEntry = secureTextEntry && !isPasswordVisible;

    const styles = StyleSheet.create({
        container: {
            marginBottom: spacing.md,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: spacing.xs,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
            borderRadius: 8,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.sm,
        },
        input: {
            flex: 1,
            paddingVertical: spacing.sm,
            fontSize: 16,
            color: colors.text,
        },
        iconContainer: {
            padding: spacing.xs,
        },
        helperText: {
            fontSize: 12,
            color: error ? colors.error : colors.textSecondary,
            marginTop: spacing.xs,
        },
        passwordToggle: {
            padding: spacing.xs,
        },
        passwordToggleText: {
            fontSize: 12,
            color: colors.primary,
            fontWeight: '600',
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={actualSecureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {showPasswordToggle && (
                    <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Text style={styles.passwordToggleText}>
                            {isPasswordVisible ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                )}

                {rightIcon && !showPasswordToggle && (
                    <View style={styles.iconContainer}>{rightIcon}</View>
                )}
            </View>

            {(error || helperText) && (
                <Text style={styles.helperText}>{error || helperText}</Text>
            )}
        </View>
    );
};