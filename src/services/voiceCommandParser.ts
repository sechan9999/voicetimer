export interface TimerCommand {
  action: 'START' | 'PAUSE' | 'RESET' | 'SET_TIMER' | 'POMODORO' | 'QUERY_TIME';
  duration?: number; // in milliseconds
}

export const parseCommand = (utterance: string): TimerCommand | null => {
  const text = utterance.toLowerCase();

  // Pattern-matching for duration (Korean & English)
  // Example: "5분 타이머", "5 minute timer", "five minutes"
  const durationMatch = text.match(/(\d+|하나|둘|셋|넷|다섯|여섯|일곱|여덟|아홉|열|one|two|three|four|five|six|seven|eight|nine|ten)\s*(분|minutes|minute|mins|min)/);
  
  if (durationMatch) {
    const numStr = durationMatch[1];
    let mins = parseInt(numStr);
    
    if (isNaN(mins)) {
      const map: Record<string, number> = {
        '하나': 1, '둘': 2, '셋': 3, '넷': 4, '다섯': 5, 
        '여섯': 6, '일곱': 7, '여덟': 8, '아홉': 9, '열': 10,
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      mins = map[numStr] || 1;
    }
    
    return { action: 'SET_TIMER', duration: mins * 60 * 1000 };
  }

  // Start commands
  if (text.includes('시작') || text.includes('start') || text.includes('run')) {
    return { action: 'START' };
  }

  // Pause commands
  if (text.includes('정지') || text.includes('일시정지') || text.includes('멈춰') || text.includes('pause') || text.includes('stop')) {
    return { action: 'PAUSE' };
  }

  // Reset commands
  if (text.includes('리셋') || text.includes('초기화') || text.includes('reset') || text.includes('restart')) {
    return { action: 'RESET' };
  }

  // Pomodoro
  if (text.includes('포모도로') || text.includes('pomodoro') || text.includes('focus')) {
    return { action: 'POMODORO' };
  }

  // Query time
  if (text.includes('남은 시간') || text.includes('몇 분') || text.includes('time left') || text.includes('remaining')) {
    return { action: 'QUERY_TIME' };
  }

  return null;
};
