import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { useSettingsStore } from '../../store/settingsStore';
import { useTimerStore } from '../../store/timerStore';
import * as Haptics from 'expo-haptics';

const PRESETS = [
  { label: '1m', duration: 60000 },
  { label: '3m', duration: 180000 },
  { label: '5m', duration: 300000 },
  { label: '10m', duration: 600000 },
  { label: '25m', duration: 1500000 },
  { label: '60m', duration: 3600000 },
];

export const PresetGrid: React.FC = () => {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];
  const { timers, activeTimerIndex, setPreset } = useTimerStore();
  const currentDuration = timers[activeTimerIndex].duration;

  const handleSelectPreset = (duration: number, label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreset(activeTimerIndex, duration, label);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {PRESETS.map((p) => {
        const isSelected = currentDuration === p.duration;
        return (
          <TouchableOpacity
            key={p.label}
            onPress={() => handleSelectPreset(p.duration, p.label)}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected ? theme.accent : theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? (themeType === 'light' ? '#fff' : '#000') : theme.text },
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 48,
    marginTop: 24,
  },
  content: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
