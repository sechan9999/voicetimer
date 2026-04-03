import { useState, useCallback } from 'react';

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'recording' | 'recognized' | 'error'>('idle');

  const toggleListening = useCallback(() => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript('Web Speech Mock (RN-Voice not for web)');
      setStatus('recording');
    } else {
      setStatus('idle');
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    status,
    startListening: () => {},
    stopListening: () => {},
    toggleListening
  };
};
