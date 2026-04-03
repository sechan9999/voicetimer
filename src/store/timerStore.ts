import { create } from 'zustand';

export enum TimerStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  DONE = 'done',
}

export enum TimerMode {
  COUNTDOWN = 'countdown',
  STOPWATCH = 'stopwatch',
  POMODORO = 'pomodoro',
}

export interface TimerSlot {
  id: string;
  duration: number; // in milliseconds
  remaining: number; // in milliseconds
  status: TimerStatus;
  mode: TimerMode;
  label: string;
}

interface TimerState {
  timers: TimerSlot[];
  activeTimerIndex: number;
  startTimer: (index: number, duration?: number) => void;
  pauseTimer: (index: number) => void;
  resetTimer: (index: number) => void;
  updateRemaining: (index: number, remaining: number) => void;
  switchTimer: (index: number) => void;
  setPreset: (index: number, duration: number, label?: string) => void;
  setMode: (index: number, mode: TimerMode) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timers: [
    {
      id: 'timer-1',
      duration: 300000,
      remaining: 300000,
      status: TimerStatus.IDLE,
      mode: TimerMode.COUNTDOWN,
      label: 'Main Timer',
    },
    {
      id: 'timer-2',
      duration: 60000,
      remaining: 60000,
      status: TimerStatus.IDLE,
      mode: TimerMode.COUNTDOWN,
      label: 'Sub Timer 1',
    },
    {
      id: 'timer-3',
      duration: 120000,
      remaining: 120000,
      status: TimerStatus.IDLE,
      mode: TimerMode.COUNTDOWN,
      label: 'Sub Timer 2',
    },
  ],
  activeTimerIndex: 0,
  startTimer: (index, duration) =>
    set((state) => {
      const newTimers = [...state.timers];
      if (duration !== undefined) {
        newTimers[index].duration = duration;
        newTimers[index].remaining = duration;
      }
      newTimers[index].status = TimerStatus.RUNNING;
      return { timers: newTimers };
    }),
  pauseTimer: (index) =>
    set((state) => {
      const newTimers = [...state.timers];
      newTimers[index].status = TimerStatus.PAUSED;
      return { timers: newTimers };
    }),
  resetTimer: (index) =>
    set((state) => {
      const newTimers = [...state.timers];
      newTimers[index].status = TimerStatus.IDLE;
      newTimers[index].remaining = newTimers[index].duration;
      return { timers: newTimers };
    }),
  updateRemaining: (index, remaining) =>
    set((state) => {
      const newTimers = [...state.timers];
      newTimers[index].remaining = remaining;
      if (remaining <= 0) {
        newTimers[index].status = TimerStatus.DONE;
        newTimers[index].remaining = 0;
      }
      return { timers: newTimers };
    }),
  switchTimer: (index) => set({ activeTimerIndex: index }),
  setPreset: (index, duration, label) =>
    set((state) => {
      const newTimers = [...state.timers];
      newTimers[index].duration = duration;
      newTimers[index].remaining = duration;
      if (label) newTimers[index].label = label;
      return { timers: newTimers };
    }),
  setMode: (index, mode) =>
    set((state) => {
      const newTimers = [...state.timers];
      newTimers[index].mode = mode;
      return { timers: newTimers };
    }),
}));
