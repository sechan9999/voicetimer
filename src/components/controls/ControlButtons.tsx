import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { useSettingsStore } from '../../store/settingsStore';
import { useTimerStore, TimerStatus } from '../../store/timerStore';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ControlButtons: React.FC = () => {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];
  const { timers, activeTimerIndex, startTimer, pauseTimer, resetTimer } = useTimerStore();
  const timer = timers[activeTimerIndex];

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const onPressIn = () => {
    scale.value = 0.9;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const handleStartPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (timer.status === TimerStatus.RUNNING) {
      pauseTimer(activeTimerIndex);
    } else {
      startTimer(activeTimerIndex);
    }
  };

  const handleReset = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    resetTimer(activeTimerIndex);
  };

  return (
    <View style={styles.container}>
      {/* Reset */}
      <AnimatedTouchable
        onPress={handleReset}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.smallButton, { backgroundColor: theme.surface, borderColor: theme.border }, animatedStyle]}
      >
        <RotateCcw color={theme.muted} size={24} />
      </AnimatedTouchable>

      {/* Start/Pause */}
      <AnimatedTouchable
        onPress={handleStartPause}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.mainButton, { backgroundColor: theme.accent }, animatedStyle]}
      >
        {timer.status === TimerStatus.RUNNING ? (
          <Pause color={themeType === 'light' ? '#fff' : '#000'} size={32} fill={themeType === 'light' ? '#fff' : '#000'} />
        ) : (
          <Play color={themeType === 'light' ? '#fff' : '#000'} size={32} fill={themeType === 'light' ? '#fff' : '#000'} />
        )}
      </AnimatedTouchable>

      {/* Placeholder / Dummy for spacing */}
      <View style={styles.smallButtonPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    marginTop: 32,
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  smallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  smallButtonPlaceholder: {
    width: 56,
    height: 56,
  }
});
