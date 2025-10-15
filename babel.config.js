module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@': './src',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@utils': './src/utils',
                        '@types': './src/types',
                        '@hooks': './src/hooks',
                        '@services': './src/services',
                        '@constants': './src/constants',
                        '@theme': './src/theme',
                    },
                },
            ],
            'react-native-reanimated/plugin', // Must be last
        ],
    };
};