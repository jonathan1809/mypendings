class LocalStorageService {
  get<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : null;
    } catch (error) {
      console.error("LocalStorage");
      return null;
    }
  }

  set<T>(key: string, payload: T) {
    try {
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.error("Error in LocalStorage");
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error in LocalStorage");
    }
  }
}

export default new LocalStorageService();
