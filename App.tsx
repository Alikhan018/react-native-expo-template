import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@/theme/index';
import { SettingsScreen } from '@/screens/SettingsScreen';

export default function App() {
  return (
    <ThemeProvider>
      <SettingsScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
