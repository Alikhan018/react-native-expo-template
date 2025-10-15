# Core Components Library

A collection of essential, reusable React Native components with TypeScript support and theme integration.

## 📦 Components Included

1. **Button** - Primary action buttons with variants
2. **Text** - Typography component with consistent styling
3. **Input** - Text input with validation and icons
4. **Screen** - Screen wrapper with SafeArea
5. **LoadingSpinner** - Loading states and overlays
6. **Card** - Content containers with elevation
7. **ErrorMessage** - Error display with retry
8. **Spacer** - Consistent spacing utility
9. **IconButton** - Icon-only action buttons

---

## 🚀 Quick Start

### Import Components

```typescript
import {
  Button,
  Text,
  Input,
  Screen,
  LoadingSpinner,
  Card,
  ErrorMessage,
  Spacer,
  IconButton,
} from '@components/common';
```

---

## 📖 Component Documentation

### 1. Text Component

Themed text component with predefined variants.

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'body' | 'bodyLarge' | 'caption' | 'label'
- `color`: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'error' | 'success' | 'warning'
- `center`: boolean - Center align text
- `bold`: boolean - Bold weight
- `semiBold`: boolean - Semi-bold weight

**Example:**
```typescript
<Text variant="h1" color="primary" center>
  Welcome Back
</Text>

<Text variant="body" color="textSecondary">
  Please sign in to continue
</Text>
```

---

### 2. Input Component

Text input with label, validation, and icon support.

**Props:**
- `label`: string - Input label
- `error`: string - Error message
- `helperText`: string - Helper text below input
- `leftIcon`: ReactNode - Icon on left
- `rightIcon`: ReactNode - Icon on right
- `secureTextEntry`: boolean - Password mode (auto show/hide)
- All standard TextInput props

**Example:**
```typescript
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
  autoCapitalize="none"
/>

<Input
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>
```

---

### 3. Screen Component

Wrapper for all screens with SafeArea and scroll support.

**Props:**
- `scrollable`: boolean - Enable ScrollView
- `statusBarStyle`: 'light' | 'dark' - Status bar style
- `edges`: Array - SafeArea edges ['top', 'bottom', 'left', 'right']
- `style`: ViewStyle - Container style
- `contentContainerStyle`: ViewStyle - Scroll content style
- `scrollViewProps`: ScrollViewProps - Additional scroll props

**Example:**
```typescript
<Screen scrollable>
  <Text variant="h1">My Screen</Text>
  <Button title="Action" onPress={handlePress} />
</Screen>

<Screen statusBarStyle="light" edges={['top']}>
  <View>Content</View>
</Screen>
```

---

### 4. LoadingSpinner Component

Loading indicator with optional text and overlay.

**Props:**
- `size`: 'small' | 'large'
- `text`: string - Loading message
- `fullScreen`: boolean - Cover entire screen
- `overlay`: boolean - Dark overlay background
- `color`: string - Spinner color
- `containerStyle`: ViewStyle

**Example:**
```typescript
// Inline loading
<LoadingSpinner size="small" text="Loading..." />

// Full screen with overlay
<LoadingSpinner 
  fullScreen 
  overlay 
  text="Please wait..." 
/>

// In a card
<Card>
  {loading ? (
    <LoadingSpinner size="small" />
  ) : (
    <Text>Content</Text>
  )}
</Card>
```

---

### 5. Card Component

Container for grouped content with elevation.

**Props:**
- `variant`: 'elevated' | 'outlined' | 'filled'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `onPress`: () => void - Makes card pressable
- `style`: ViewStyle

**Example:**
```typescript
<Card variant="elevated" padding="md">
  <Text variant="h3">Card Title</Text>
  <Spacer size="sm" />
  <Text variant="body">Card content goes here</Text>
</Card>

<Card variant="outlined" onPress={handleCardPress}>
  <Text>Pressable Card</Text>
</Card>
```

---

### 6. ErrorMessage Component

Display errors with optional retry action.

**Props:**
- `title`: string - Error title (default: "Something went wrong")
- `message`: string - Error description
- `onRetry`: () => void - Retry callback
- `retryText`: string - Retry button text
- `fullScreen`: boolean - Full screen display
- `icon`: ReactNode - Custom icon
- `style`: ViewStyle

**Example:**
```typescript
<ErrorMessage
  title="Network Error"
  message="Unable to connect. Please check your internet connection."
  onRetry={fetchData}
  retryText="Retry"
/>

<ErrorMessage
  message="Failed to load data"
  fullScreen
  onRetry={() => refetch()}
/>
```

---

### 7. Spacer Component

Utility for consistent spacing between elements.

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
- `horizontal`: boolean - Horizontal spacing
- `custom`: number - Custom spacing value
- `style`: ViewStyle

**Example:**
```typescript
<Text>First Element</Text>
<Spacer size="md" />
<Text>Second Element</Text>

// Horizontal spacing
<View style={{ flexDirection: 'row' }}>
  <Button title="Cancel" />
  <Spacer size="sm" horizontal />
  <Button title="Submit" />
</View>

// Custom spacing
<Spacer custom={50} />
```

---

### 8. IconButton Component

Button with just an icon for actions.

**Props:**
- `icon`: ReactNode - Icon component
- `onPress`: () => void - Press handler
- `size`: 'small' | 'medium' | 'large'
- `variant`: 'default' | 'contained' | 'outlined'
- `disabled`: boolean
- `style`: ViewStyle

**Example:**
```typescript
import { X, Menu, Settings } from 'lucide-react-native';

<IconButton
  icon={<X size={24} color={colors.text} />}
  onPress={handleClose}
  size="medium"
/>

<IconButton
  icon={<Menu size={24} color="white" />}
  onPress={openMenu}
  variant="contained"
  size="large"
/>
```

---

