import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';

export interface TimerSession {
  id?: string;
  uid: string;
  duration: number;
  mode: string;
  completedAt: number;
  voiceUsed: boolean;
}

export interface TimerPreset {
  id?: string;
  uid: string;
  label: string;
  duration: number;
}

export const firebaseService = {
  // Session History
  saveSession: async (session: TimerSession) => {
    try {
      const ref = await firestore()
        .collection('users')
        .doc(session.uid)
        .collection('sessions')
        .add({
          ...session,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      
      await analytics().logEvent('timer_completed', {
        duration: Math.floor(session.duration / 1000),
        mode: session.mode,
        voice_used: session.voiceUsed,
      });

      return ref.id;
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  },

  getSessions: async (uid: string, limit: number = 20) => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('sessions')
        .orderBy('completedAt', 'desc')
        .limit(limit)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TimerSession[];
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },

  deleteSession: async (uid: string, sessionId: string) => {
    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .collection('sessions')
        .doc(sessionId)
        .delete();
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },

  // Presets
  savePreset: async (preset: TimerPreset) => {
    try {
      const ref = await firestore()
        .collection('users')
        .doc(preset.uid)
        .collection('presets')
        .add(preset);
      
      await analytics().logEvent('preset_saved', {
        label: preset.label,
        duration: Math.floor(preset.duration / 1000),
      });

      return ref.id;
    } catch (error) {
      console.error('Error saving preset:', error);
      throw error;
    }
  },

  getPresets: async (uid: string) => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('presets')
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TimerPreset[];
    } catch (error) {
      console.error('Error fetching presets:', error);
      throw error;
    }
  }
};
