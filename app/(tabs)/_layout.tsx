import { Tabs } from 'expo-router';
import { useSettingsStore } from '../../src/store/settingsStore';
import { colors } from '../../src/theme/colors';
import { Timer, History, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color, size }) => <Timer color={color} size={size} />,
          headerTitle: 'Voice Timer',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
          headerTitle: 'Session History',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
          headerTitle: 'App Settings',
        }}
      />
    </Tabs>
  );
}
