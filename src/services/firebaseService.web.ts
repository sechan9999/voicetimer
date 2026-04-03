export const firebaseService = {
  saveSession: async () => { console.warn('Firebase (Web) Mock: saveSession'); return 'web-mock-id'; },
  getSessions: async () => { console.warn('Firebase (Web) Mock: getSessions'); return []; },
  deleteSession: async () => { console.warn('Firebase (Web) Mock: deleteSession'); },
  savePreset: async () => { console.warn('Firebase (Web) Mock: savePreset'); return 'web-mock-id'; },
  getPresets: async () => { console.warn('Firebase (Web) Mock: getPresets'); return []; },
};
