import { useCallback } from 'react';

export const useTTS = () => {
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('SpeechSynthesis (Web) not available');
    }
  }, []);

  return {
    speak,
    stop: () => window.speechSynthesis && window.speechSynthesis.cancel(),
    announceTimerStarted: (ms: number) => speak(`${Math.floor(ms/1000)}초 타이머 시작`),
    announceTimerFinished: () => speak('완료되었습니다'),
    announceRemainingTime: (ms: number) => speak(`남은 시간 ${Math.floor(ms/1000)}초`),
  };
};
