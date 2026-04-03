import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { CircularTimer } from './CircularTimer';
import { TimerDisplay } from './TimerDisplay';
import { useTimerStore, TimerStatus } from '../../store/timerStore';
import { colors } from '../../theme/colors';
import { useSettingsStore } from '../../store/settingsStore';

interface TimerCardProps {
  index: number;
}

export const TimerCard: React.FC<TimerCardProps> = ({ index }) => {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];
  const { timers, activeTimerIndex, switchTimer } = useTimerStore();
  const timer = timers[index];
  const isActive = activeTimerIndex === index;

  const progress = timer.remaining / timer.duration;

  return (
    <TouchableOpacity
      onPress={() => switchTimer(index)}
      style={[
        styles.container,
        {
          backgroundColor: isActive ? theme.surface : 'transparent',
          borderColor: isActive ? theme.accent : theme.border,
        },
      ]}
    >
      <View style={styles.ringWrapper}>
        <CircularTimer
          progress={progress}
          size={50}
          strokeWidth={4}
          color={isActive ? theme.accent : theme.muted}
          secondaryColor={theme.border}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text
          style={[
            styles.label,
            { color: isActive ? theme.text : theme.muted },
          ]}
          numberOfLines={1}
        >
          {timer.label}
        </Text>
        <TimerDisplay
          timeInMs={timer.remaining}
          size="small"
          color={isActive ? theme.text : theme.muted}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 4,
    gap: 12,
  },
  ringWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
});
