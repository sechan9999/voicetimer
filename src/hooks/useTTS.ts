import * as Speech from 'expo-speech';
import { useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export const useTTS = () => {
  const { voiceEnabled } = useSettingsStore();

  const speak = useCallback((text: string, options?: Speech.SpeechOptions) => {
    if (!voiceEnabled) return;

    Speech.speak(text, {
      language: 'ko-KR', // Default to Korean
      pitch: 1.0,
      rate: 1.0,
      ...options,
    });
  }, [voiceEnabled]);

  const stop = useCallback(() => {
    Speech.stop();
  }, []);

  const announceTimerStarted = useCallback((durationMs: number) => {
    const mins = Math.floor(durationMs / 60000);
    const secs = Math.floor((durationMs % 60000) / 1000);
    let msg = '';
    
    if (mins > 0 && secs > 0) {
      msg = `${mins}분 ${secs}초 타이머를 시작합니다.`;
    } else if (mins > 0) {
      msg = `${mins}분 타이머를 시작합니다.`;
    } else {
      msg = `${secs}초 타이머를 시작합니다.`;
    }
    
    speak(msg);
  }, [speak]);

  const announceTimerFinished = useCallback(() => {
    speak('타이머가 완료되었습니다. 수고하셨습니다!');
  }, [speak]);

  const announceRemainingTime = useCallback((remainingMs: number) => {
    const mins = Math.floor(remainingMs / 60000);
    const secs = Math.floor((remainingMs % 60000) / 1000);
    let msg = '';
    
    if (mins > 0 && secs > 0) {
      msg = `남은 시간은 ${mins}분 ${secs}초입니다.`;
    } else if (mins > 0) {
      msg = `남은 시간은 ${mins}분입니다.`;
    } else {
      msg = `남은 시간은 ${secs}초입니다.`;
    }
    
    speak(msg);
  }, [speak]);

  return {
    speak,
    stop,
    announceTimerStarted,
    announceTimerFinished,
    announceRemainingTime
  };
};
