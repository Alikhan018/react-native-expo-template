import React, { useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
} from 'react-native';
import { useTheme } from '@theme/index';

interface OTPInputProps {
    length?: number;
    value: string[];
    onChange: (otp: string[]) => void;
    onComplete?: (otp: string) => void;
    label?: string;
    error?: string;
    containerStyle?: object;
}

export const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    value,
    onChange,
    onComplete,
    label,
    error,
    containerStyle,
}) => {
    const { colors, spacing } = useTheme();
    const inputRefs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        if (value.filter(v => v).length === length && onComplete) {
            onComplete(value.join(''));
        }
    }, [value, length, onComplete]);

    const handleChange = (text: string, index: number) => {
        const numericText = text.replace(/[^0-9]/g, '');

        if (numericText.length === 0) {
            const newValue = [...value];
            newValue[index] = '';
            onChange(newValue);
            return;
        }

        const newValue = [...value];
        newValue[index] = numericText[numericText.length - 1];
        onChange(newValue);

        // Auto-focus next input
        if (index < length - 1 && numericText.length > 0) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const styles = StyleSheet.create({
        container: {
            marginBottom: spacing.md,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: spacing.sm,
            textAlign: 'center',
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: spacing.sm,
        },
        input: {
            width: 48,
            height: 56,
            borderWidth: 2,
            borderColor: error ? colors.error : colors.border,
            borderRadius: 8,
            backgroundColor: colors.surface,
            fontSize: 24,
            fontWeight: '600',
            color: colors.text,
            textAlign: 'center',
        },
        inputFilled: {
            borderColor: colors.primary,
        },
        errorText: {
            fontSize: 12,
            color: colors.error,
            marginTop: spacing.xs,
            textAlign: 'center',
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                {Array.from({ length }).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[
                            styles.input,
                            value[index] && styles.inputFilled,
                        ]}
                        value={value[index] || ''}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                        autoFocus={index === 0}
                    />
                ))}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};