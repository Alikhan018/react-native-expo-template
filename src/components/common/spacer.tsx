import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface SpacerProps {
    size?: SpacerSize;
    horizontal?: boolean;
    custom?: number;
    style?: ViewStyle;
}

export const Spacer: React.FC<SpacerProps> = ({
    size = 'md',
    horizontal = false,
    custom,
    style,
}) => {
    const { spacing } = useTheme();

    const sizeMap = {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        xxl: spacing.xxl,
    };

    const spacingValue = custom || sizeMap[size];

    const spacerStyle: ViewStyle = horizontal
        ? { width: spacingValue }
        : { height: spacingValue };

    return <View style={[spacerStyle, style]} />;
};