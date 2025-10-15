export const lightColors = {
    primary: '#FF3B30',
    secondary: '#007AFF',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
} as const;

export const darkColors = {
    primary: '#FF453A',
    secondary: '#0A84FF',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    border: '#38383A',
} as const;

export type ColorScheme = typeof lightColors | typeof darkColors;