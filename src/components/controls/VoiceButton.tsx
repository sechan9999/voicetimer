import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { useSettingsStore } from '../../store/settingsStore';
import * as Haptics from 'expo-haptics';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
  status: 'idle' | 'recording' | 'recognized' | 'error';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  onPress,
  status,
}) => {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];

  const pulse = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      pulse.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
    } else {
      pulse.value = withTiming(0);
    }
  }, [isListening]);

  const pulseStyle = useAnimatedStyle(() => {
    const s = 1 + pulse.value * 0.4;
    const opacity = 1 - pulse.value;
    return {
      transform: [{ scale: s }],
      opacity,
      backgroundColor: status === 'recording' ? theme.error : theme.accent,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const bg = 
      status === 'recording' ? theme.error : 
      status === 'recognized' ? theme.success : 
      status === 'error' ? theme.error : 
      theme.accent;

    return {
      backgroundColor: bg,
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const onPressIn = () => {
    scale.value = 0.9;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  return (
    <View style={styles.container}>
      {isListening && <Animated.View style={[styles.pulseRing, pulseStyle]} />}
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.button, buttonStyle]}
        activeOpacity={0.8}
      >
        <Mic
          color={themeType === 'light' ? '#fff' : '#000'}
          size={28}
          strokeWidth={2.5}
        />
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  pulseRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    zIndex: -1,
  },
});
