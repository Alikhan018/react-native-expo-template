import React, { useState } from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/index';
import { Text } from './text';

interface SearchInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    searchIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    containerStyle?: object;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChangeText,
    onClear,
    searchIcon,
    clearIcon,
    containerStyle,
    placeholder = 'Search...',
    ...props
}) => {
    const { colors, spacing } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isFocused ? colors.primary : colors.border,
            borderRadius: 24,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
            height: 48,
        },
        searchIconContainer: {
            marginRight: spacing.sm,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: colors.text,
            paddingVertical: 0,
        },
        clearButton: {
            padding: spacing.xs,
            marginLeft: spacing.xs,
        },
        defaultSearchIcon: {
            fontSize: 18,
        },
        defaultClearIcon: {
            fontSize: 16,
        },
    });

    const defaultSearchIcon = <Text style={styles.defaultSearchIcon}>🔍</Text>;
    const defaultClearIcon = <Text style={styles.defaultClearIcon}>✕</Text>;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.searchIconContainer}>
                {searchIcon || defaultSearchIcon}
            </View>

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                returnKeyType="search"
                {...props}
            />

            {value.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                    {clearIcon || defaultClearIcon}
                </TouchableOpacity>
            )}
        </View>
    );
};