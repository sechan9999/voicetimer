import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSettingsStore } from '../src/store/settingsStore';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];

  return (
    <>
      <StatusBar style={themeType === 'light' ? 'dark' : 'light'} />
      <Slot />
    </>
  );
}
