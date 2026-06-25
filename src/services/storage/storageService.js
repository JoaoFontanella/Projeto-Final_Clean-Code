import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
  async getItem(key) {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw == null ? null : JSON.parse(raw);
    } catch (err) {
      console.error('storageService.getItem error', err);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('storageService.setItem error', err);
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error('storageService.removeItem error', err);
    }
  },
};

export default storageService;
