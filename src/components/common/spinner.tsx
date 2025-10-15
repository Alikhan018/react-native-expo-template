import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';
import { Text } from './text';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    text?: string;
    fullScreen?: boolean;
    overlay?: boolean;
    color?: string;
    containerStyle?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'large',
    text,
    fullScreen = false,
    overlay = false,
    color,
    containerStyle,
}) => {
    const { colors } = useTheme();

    const spinnerColor = color || colors.primary;

    const styles = StyleSheet.create({
        fullScreenContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: overlay ? 'rgba(0, 0, 0, 0.5)' : colors.background,
            zIndex: 9999,
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        textContainer: {
            marginTop: 12,
        },
    });

    const content = (
        <>
            <ActivityIndicator size={size} color={spinnerColor} />
            {text && (
                <View style={styles.textContainer}>
                    <Text variant="body" color="textSecondary" center>
                        {text}
                    </Text>
                </View>
            )}
        </>
    );

    if (fullScreen) {
        return <View style={styles.fullScreenContainer}>{content}</View>;
    }

    return <View style={[styles.container, containerStyle]}>{content}</View>;
};