# 🚀 React Native Expo + TypeScript Template

A modern, scalable **React Native + Expo** starter template built with **TypeScript**, **Expo Router**, and a clean architecture for building production-ready mobile apps faster.

This template includes a fully configured environment with theming, navigation, linting, folder conventions, and helpful utilities — so you can focus on building your app instead of boilerplate setup.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Theme System](#-theme-system)
- [Navigation (Expo Router)](#-navigation-expo-router)
- [Common Errors & Fixes](#-common-errors--fixes)
- [Recommended Extensions](#-recommended-extensions)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

✅ **Expo + TypeScript** — built on the latest Expo SDK with full TypeScript support  
✅ **Expo Router** — file-based routing for screens  
✅ **Theme system** — light/dark theme support using React context  
✅ **Gesture Handler + Reanimated** preconfigured  
✅ **Prettier + ESLint** — code formatting and linting setup  
✅ **Environment variable support** (`.env`)  
✅ **Scalable folder structure** — modular and production-ready  
✅ **UI Components** — base reusable components (`Screen`, `Text`, `Spacer`, etc.)  
✅ **Custom Animations & Gradients** — smooth and modern UX out of the box  

---

## 🧱 Tech Stack

| Category | Tech |
|-----------|------|
| Framework | [React Native](https://reactnative.dev/) |
| Runtime | [Expo](https://expo.dev/) |
| Router | [Expo Router](https://expo.github.io/router/docs/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | React Native Components + LinearGradient + BlurView |
| State/Theming | Custom Theme Context (`ThemeProvider`, `useTheme`) |
| Linting | ESLint + Prettier |
| Animations | React Native Animated API |
| Icons | [@expo/vector-icons](https://docs.expo.dev/guides/icons/) |

---

## ⚙️ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Alikhan018/react-native-expo-template.git
cd react-native-expo-template
```

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Run on device/emulator
npm run start
# or
npx expo start

Then scan the QR code in Expo Go (iOS/Android) or press i/a to launch simulators.


🗂️ Project Structure
.
├── app/                    # Expo Router structure
│   ├── _layout.tsx         # Root layout (ThemeProvider + Slot)
│   └── index.tsx           # Landing screen
│
├── src/
│   ├── theme/              # Theme context & hooks
│   │   ├── ThemeContext.tsx
│   │   └── index.ts
│   ├── components/         # Reusable UI components
│   │   └── ui/             # Screen, Text, Spacer, etc.
│   ├── assets/             # Images, icons, fonts
│   ├── utils/              # Helper functions
│   └── hooks/              # Custom hooks
│
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier formatting rules
├── babel.config.js         # Babel config
├── tsconfig.json           # TypeScript configuration
├── app.json                # Expo config
├── package.json            # Dependencies & scripts
└── README.md

🧭 Navigation (Expo Router)

This project uses Expo Router
, which allows file-based navigation.

Every file inside the /app folder becomes a route.

_layout.tsx defines the common layout (providers, wrappers, etc.).

Use <Slot /> to render nested routes.

Example:

// app/_layout.tsx
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/theme";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

🎨 Theme System

Your app theme (light/dark mode, color palette, spacing, etc.) is managed globally using a ThemeContext.

Usage Example:

import { useTheme } from "@/theme";

const { colors, spacing, isDark } = useTheme();


To apply theme globally:
The ThemeProvider is already wrapped in _layout.tsx, so all screens can access the theme context directly.

🧰 Scripts
Script	Description
npm run start	Start Expo bundler
npm run ios	Run app on iOS simulator
npm run android	Run app on Android emulator
npm run web	Run app in browser
npm run lint	Run ESLint checks
npm run format	Run Prettier formatting
⚠️ Common Errors & Fixes
1. React version mismatch
Incompatible React versions:
react: 19.2.0
react-native-renderer: 19.1.0


✅ Run this to fix:

npx expo install react react-dom react-native

2. Missing default export in _layout.tsx

Make sure _layout.tsx has:

export default function Layout() { ... }

3. “useTheme must be used within ThemeProvider”

✅ Ensure <ThemeProvider> wraps all routes inside _layout.tsx.

🧩 Recommended VS Code Extensions

ESLint — linting & code standards

Prettier — automatic formatting

React Native Tools — debugging and Metro integration

Path Intellisense — better import autocomplete

Color Highlight — highlights color hex values

🤝 Contributing

Fork the repo

Create a feature branch:

git checkout -b feature/new-feature


Commit your changes:

git commit -m "Add new feature"


Push to your branch:

git push origin feature/new-feature


Open a Pull Request

All contributions are welcome! 🚀

📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute.

Created by Ali Khan

A clean foundation to build beautiful, performant, and scalable mobile apps with Expo + TypeScript.
