import { View, StyleSheet, SafeAreaView, Text, Animated as RNAnimated } from 'react-native';
import { useSettingsStore } from '../../src/store/settingsStore';
import { colors } from '../../src/theme/colors';
import { useTimerStore, TimerStatus } from '../../src/store/timerStore';
import { useTimer } from '../../src/hooks/useTimer';
import { CircularTimer } from '../../src/components/timer/CircularTimer';
import { TimerDisplay } from '../../src/components/timer/TimerDisplay';
import { ControlButtons } from '../../src/components/controls/ControlButtons';
import { PresetGrid } from '../../src/components/controls/PresetGrid';
import { VoiceButton } from '../../src/components/controls/VoiceButton';
import { TimerCard } from '../../src/components/timer/TimerCard';
import { useVoice } from '../../src/hooks/useVoice';
import { useTTS } from '../../src/hooks/useTTS';
import { useEffect, useRef } from 'react';
import { Play, Pause, CheckCircle2 } from 'lucide-react-native';

export default function TimerScreen() {
  const themeType = useSettingsStore((state) => state.theme);
  const theme = colors[themeType];
  const { activeTimerIndex, timers } = useTimerStore();
  const { activeTimer } = useTimer();
  const { isListening, toggleListening, transcript, status: voiceStatus } = useVoice();
  const { announceTimerStarted, announceTimerFinished, announceRemainingTime } = useTTS();
  
  const lastState = useRef(activeTimer.status);

  // Monitor timer status changes
  useEffect(() => {
    if (activeTimer.status === TimerStatus.RUNNING && lastState.current !== TimerStatus.RUNNING) {
      announceTimerStarted(activeTimer.remaining);
    } else if (activeTimer.status === TimerStatus.DONE && lastState.current !== TimerStatus.DONE) {
      announceTimerFinished();
      // Here you would save to Firestore: firebaseService.saveSession(...)
    }
    lastState.current = activeTimer.status;
  }, [activeTimer.status, activeTimer.remaining]);

  const progress = activeTimer.remaining / activeTimer.duration;
  
  const StatusBadge = () => {
    let Icon = Play;
    let label = 'READY';
    let color = theme.muted;

    if (activeTimer.status === TimerStatus.RUNNING) {
      Icon = Play;
      label = 'RUNNING';
      color = theme.success;
    } else if (activeTimer.status === TimerStatus.PAUSED) {
      Icon = Pause;
      label = 'PAUSED';
      color = theme.warning;
    } else if (activeTimer.status === TimerStatus.DONE) {
      Icon = CheckCircle2;
      label = 'COMPLETED';
      color = theme.success;
    }

    return (
      <View style={[styles.badge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Icon size={12} color={color} fill={color} />
        <Text style={[styles.badgeText, { color }]}>{label}</Text>
      </View>
    );
  };

  const TranscriptOverlay = () => {
    if (!isListening && !transcript) return null;
    return (
      <View style={[styles.transcriptBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.transcriptText, { color: theme.text }]}>
          {transcript || '듣고 있습니다...'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.modeLabel, { color: theme.muted }]}>
            {activeTimer.mode.toUpperCase()}
          </Text>
        </View>

        <View style={styles.mainTimerContainer}>
          <CircularTimer
            progress={progress}
            size={280}
            strokeWidth={12}
            color={theme.accent}
            secondaryColor={theme.border}
          />
          <View style={styles.displayOverlay}>
            <TimerDisplay timeInMs={activeTimer.remaining} />
            <StatusBadge />
          </View>
        </View>

        <PresetGrid />
        
        <ControlButtons />

        <View style={styles.subTimersRow}>
          <TimerCard index={1} />
          <TimerCard index={2} />
        </View>

        <TranscriptOverlay />
      </View>

      <VoiceButton 
        isListening={isListening} 
        onPress={toggleListening} 
        status={voiceStatus} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerRow: {
    marginBottom: 20,
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  mainTimerContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 12,
    gap: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  subTimersRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 40,
    gap: 12,
  },
  transcriptBox: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    maxWidth: '80%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  transcriptText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
