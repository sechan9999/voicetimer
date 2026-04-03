import { useState, useEffect, useCallback } from 'react';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { parseCommand } from '../services/voiceCommandParser';
import { useTimerStore } from '../store/timerStore';
import * as Haptics from 'expo-haptics';

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'recording' | 'recognized' | 'error'>('idle');
  
  const { activeTimerIndex, startTimer, pauseTimer, resetTimer, setPreset } = useTimerStore();

  const onSpeechStart = () => {
    setIsListening(true);
    setStatus('recording');
    setTranscript('');
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error('Speech Error:', e);
    setIsListening(false);
    setStatus('error');
    setTimeout(() => setStatus('idle'), 2000);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      const text = e.value[0];
      setTranscript(text);
      
      const command = parseCommand(text);
      if (command) {
        setStatus('recognized');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        switch (command.action) {
          case 'START':
            startTimer(activeTimerIndex);
            break;
          case 'PAUSE':
            pauseTimer(activeTimerIndex);
            break;
          case 'RESET':
            resetTimer(activeTimerIndex);
            break;
          case 'SET_TIMER':
            if (command.duration) {
              setPreset(activeTimerIndex, command.duration);
            }
            break;
          case 'POMODORO':
            setPreset(activeTimerIndex, 1500000, 'Pomodoro');
            startTimer(activeTimerIndex);
            break;
          default:
            break;
        }
        
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('idle');
      }
    }
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      setTranscript(e.value[0]);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [activeTimerIndex]);

  const startListening = useCallback(async () => {
    try {
      await Voice.start('ko-KR'); // Default to Korean
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleListening = useCallback(async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    status,
    startListening,
    stopListening,
    toggleListening
  };
};
