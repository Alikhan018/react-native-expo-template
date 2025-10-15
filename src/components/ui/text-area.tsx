import React, { useState } from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    Text,
} from 'react-native';
import { useTheme } from '@theme/index';

interface TextAreaProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    maxLength?: number;
    showCharCount?: boolean;
    minHeight?: number;
    containerStyle?: object;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    helperText,
    maxLength,
    showCharCount = false,
    minHeight = 120,
    containerStyle,
    value = '',
    style,
    ...props
}) => {
    const { colors, spacing } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const charCount = value?.length || 0;

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
            borderWidth: 1,
            borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
            borderRadius: 8,
            backgroundColor: colors.surface,
            padding: spacing.sm,
            minHeight,
        },
        input: {
            fontSize: 16,
            color: colors.text,
            textAlignVertical: 'top',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
        },
        helperText: {
            fontSize: 12,
            color: error ? colors.error : colors.textSecondary,
            flex: 1,
        },
        charCount: {
            fontSize: 12,
            color: colors.textSecondary,
            marginLeft: spacing.sm,
        },
        charCountError: {
            color: colors.error,
        },
    });

    const isOverLimit = maxLength && charCount > maxLength;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, style]}
                    value={value}
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </View>

            {((error || helperText) || showCharCount) && (
                <View style={styles.footer}>
                    {(error || helperText) && (
                        <Text style={styles.helperText}>{error || helperText}</Text>
                    )}

                    {showCharCount && (
                        <Text style={[
                            styles.charCount,
                            isOverLimit ? styles.charCountError: null,
                        ]}>
                            {charCount}{maxLength ? `/${maxLength}` : ''}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};