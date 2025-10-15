import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';
import { Text } from './text';
import { Button } from './button';

interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    retryText?: string;
    fullScreen?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    title = 'Something went wrong',
    message,
    onRetry,
    retryText = 'Try Again',
    fullScreen = false,
    icon,
    style,
}) => {
    const { colors, spacing } = useTheme();

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.lg,
            backgroundColor: fullScreen ? colors.background : 'transparent',
        },
        fullScreen: {
            flex: 1,
        },
        iconContainer: {
            marginBottom: spacing.md,
        },
        defaultIcon: {
            fontSize: 48,
        },
        title: {
            marginBottom: spacing.sm,
        },
        message: {
            marginBottom: spacing.lg,
            maxWidth: 300,
        },
        retryButton: {
            minWidth: 120,
        },
    });

    const defaultIcon = (
        <Text style={styles.defaultIcon}>⚠️</Text>
    );

    return (
        <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
            <View style={styles.iconContainer}>
                {icon || defaultIcon}
            </View>

            <Text variant="h3" color="text" center style={styles.title}>
                {title}
            </Text>

            <Text variant="body" color="textSecondary" center style={styles.message}>
                {message}
            </Text>

            {onRetry && (
                <Button
                    title={retryText}
                    onPress={onRetry}
                    variant="primary"
                />
            )}
        </View>
    );
};