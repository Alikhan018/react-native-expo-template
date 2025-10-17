export default {
  expo: {
    name: "react-native-expo-template-typescript",
    slug: "react-native-expo-template-typescript",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "myapp",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-router"],

    // Add your custom environment variables here:
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
      AUTH_TOKEN_KEY: process.env.EXPO_PUBLIC_AUTH_TOKEN_KEY,
      AUTH_USER_KEY: process.env.EXPO_PUBLIC_AUTH_USER_KEY,
    },
  },
};
