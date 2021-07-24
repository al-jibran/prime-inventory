import AsyncStorage from "@react-native-async-storage/async-storage";

// Can be generalized for settings in general in the future.

class DeviceStorage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  async getValueStored(key) {
    const valueStored = await AsyncStorage.getItem(`${this.namespace}:${key}`);
    return valueStored ? JSON.parse(valueStored) : null;
  }

  async setValueStored(key, value) {
    await AsyncStorage.setItem(
      `${this.namespace}:${key}`,
      JSON.stringify(value)
    );
  }

  async removeValueStored(key) {
    await AsyncStorage.removeItem(`${this.namespace}:${key}`);
  }

  async getAllKeys() {
    let keys = await AsyncStorage.getAllKeys();
    return keys;
  }
}

export default DeviceStorage;
