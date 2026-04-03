import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useSettingsStore } from '../../src/store/settingsStore';
import { colors, ThemeType } from '../../src/theme/colors';

export default function SettingsScreen() {
  const { theme: themeType, setTheme, voiceEnabled, toggleVoice } = useSettingsStore();
  const theme = colors[themeType];

  const ThemeButton = ({ type, label }: { type: ThemeType, label: string }) => (
    <TouchableOpacity
      style={[
        styles.themeButton,
        {
          backgroundColor: themeType === type ? theme.accent : theme.surface,
          borderColor: theme.border,
        }
      ]}
      onPress={() => setTheme(type)}
    >
      <Text style={{
        color: themeType === type ? (type === 'light' ? '#fff' : '#000') : theme.text,
        fontWeight: 'bold'
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.muted }]}>THEME</Text>
        <View style={styles.themeRow}>
          <ThemeButton type="dark" label="Dark" />
          <ThemeButton type="light" label="Light" />
          <ThemeButton type="pomodoro" label="Pomodoro" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.muted }]}>VOICE</Text>
        <View style={[styles.optionRow, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={{ color: theme.text, fontSize: 16 }}>Voice Commands</Text>
          <Switch
            value={voiceEnabled}
            onValueChange={toggleVoice}
            trackColor={{ false: theme.border, true: theme.accent }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
