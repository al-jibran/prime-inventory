import AsyncStorage from "@react-native-async-storage/async-storage";

// Can be generalized for settings in general in the future.

class DeviceStorage {
    constructor(namespace = 'setting') {
        this.namespace = namespace;
    }

    async getValueStored(key) {
        try {
            const valueStored = await AsyncStorage.getItem(`${this.namespace}:${key}`);
            return valueStored ? valueStored : null;
        } catch (error) {
            console.log("Failed to retreive value:", error.message);
        }
    }

    async setUnitValue(key, value) {
        try {
            await AsyncStorage.setItem(`${this.namespace}:${key}`, value);
        } catch (error) {
            console.log("Failed to set value:", error.message);
        }
    }

    async removeUnitValue(key) {
        try {
        await AsyncStorage.removeItem(`${this.namespace}:${key}`);
        } catch (error) {
            console.log("Failed to remove value:", error.message);
        }
    }

    async getAllKeys() {
        let keys = await AsyncStorage.getAllKeys();
        return keys;
    }
}

export default DeviceStorage;