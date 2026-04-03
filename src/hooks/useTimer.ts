import { useEffect, useRef } from 'react';
import { useTimerStore, TimerStatus } from '../store/timerStore';

export const useTimer = () => {
  const { timers, activeTimerIndex, updateRemaining } = useTimerStore();
  const activeTimer = timers[activeTimerIndex];
  const lastTick = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeTimer.status === TimerStatus.RUNNING) {
      lastTick.current = Date.now();

      interval = setInterval(() => {
        const now = Date.now();
        const delta = now - (lastTick.current ?? now);
        lastTick.current = now;

        updateRemaining(activeTimerIndex, activeTimer.remaining - delta);
      }, 100);
    } else {
      lastTick.current = null;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer.status, activeTimer.remaining, activeTimerIndex, updateRemaining]);

  // Sub-timers are currently passive, but can be scaled if needed.
  // Generally, they would need their own intervals if they are running.
  // For the MVP, we assume the user focuses on one timer at a time.
  // However, the state supports concurrent timers if we run an interval for each.

  return { activeTimer };
};
