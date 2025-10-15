import React, { useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/index';

interface PinInputProps {
    length?: number;
    value: string;
    onChangeText: (text: string) => void;
    onComplete?: (pin: string) => void;
    label?: string;
    error?: string;
    secure?: boolean;
    containerStyle?: object;
}

export const PinInput: React.FC<PinInputProps> = ({
    length = 4,
    value,
    onChangeText,
    onComplete,
    label,
    error,
    secure = false,
    containerStyle,
}) => {
    const { colors, spacing } = useTheme();
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        const limitedText = numericText.slice(0, length);
        onChangeText(limitedText);

        if (limitedText.length === length && onComplete) {
            onComplete(limitedText);
        }
    };

    const handleBoxPress = () => {
        inputRef.current?.focus();
    };

    const boxes = Array.from({ length }, (_, index) => {
        const hasValue = index < value.length;
        const isActive = index === value.length;
        const char = hasValue ? value[index] : '';

        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.box,
                    isActive && isFocused && styles.activeBox,
                    error && styles.errorBox,
                ]}
                onPress={handleBoxPress}
                activeOpacity={1}
            >
                <Text style={styles.boxText}>
                    {secure && hasValue ? '•' : char}
                </Text>
            </TouchableOpacity>
        );
    });

    const styles = StyleSheet.create({
        container: {
            marginBottom: spacing.md,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: spacing.sm,
        },
        boxContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        box: {
            width: 56,
            height: 64,
            borderWidth: 2,
            borderColor: colors.border,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.surface,
        },
        activeBox: {
            borderColor: colors.primary,
        },
        errorBox: {
            borderColor: colors.error,
        },
        boxText: {
            fontSize: 24,
            fontWeight: '600',
            color: colors.text,
        },
        hiddenInput: {
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
        },
        errorText: {
            fontSize: 12,
            color: colors.error,
            marginTop: spacing.xs,
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.boxContainer}>
                {boxes}
            </View>

            <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={value}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={length}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};