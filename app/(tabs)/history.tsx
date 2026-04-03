import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useSettingsStore } from '../../src/store/settingsStore';
import { colors } from '../../src/theme/colors';

export default function HistoryScreen() {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={{ color: theme.text }}>No session history yet.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
