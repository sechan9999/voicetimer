import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { useSettingsStore } from '../../store/settingsStore';

interface TimerDisplayProps {
  timeInMs: number;
  color?: string;
  size?: 'large' | 'small';
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeInMs,
  color,
  size = 'large',
}) => {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];

  const totalSeconds = Math.max(0, Math.floor(timeInMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const displayTime = hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;

  return (
    <View style={styles.container}>
      <Text
        style={[
          size === 'large' ? typography.timer : typography.subTimer,
          { color: color ?? theme.text },
          styles.text,
        ]}
      >
        {displayTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'monospace', // Tabular nums fallback
  },
});
