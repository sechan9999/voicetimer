import { create } from 'zustand';
import { ThemeType } from '../theme/colors';

interface SettingsState {
  theme: ThemeType;
  voiceEnabled: boolean;
  historySyncEnabled: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleVoice: () => void;
  toggleHistorySync: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  voiceEnabled: true,
  historySyncEnabled: false,
  setTheme: (theme) => set({ theme }),
  toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
  toggleHistorySync: () =>
    set((state) => ({ historySyncEnabled: !state.historySyncEnabled })),
}));
