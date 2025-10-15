import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    ViewStyle,
    ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@theme/index';

interface ScreenProps {
    children: React.ReactNode;
    scrollable?: boolean;
    statusBarStyle?: 'light' | 'dark';
    edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    scrollViewProps?: ScrollViewProps;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    scrollable = false,
    statusBarStyle,
    edges = ['top', 'left', 'right'],
    style,
    contentContainerStyle,
    scrollViewProps = {},
}) => {
    const { colors, isDark } = useTheme();

    const defaultStatusBarStyle = statusBarStyle || (isDark ? 'light' : 'dark');

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
        },
    });

    const content = (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );

    return (
        <>
            <StatusBar
                barStyle={defaultStatusBarStyle === 'light' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <SafeAreaView style={styles.safeArea} edges={edges}>
                {scrollable ? (
                    <ScrollView
                        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        {...scrollViewProps}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    content
                )}
            </SafeAreaView>
        </>
    );
};