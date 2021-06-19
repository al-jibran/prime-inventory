import AsyncStorage from "@react-native-async-storage/async-storage";

// Can be generalized for settings in general in the future.

class UnitStorage {
    constructor(namespace = 'unit') {
        this.namespace = namespace;
    }

    async getUnitValue(unit) {
        try {
            const unitValue = await AsyncStorage.getItem(`${this.namespace}:${unit}`);
            return unitValue ? unitValue : null;
        } catch (error) {
            console.log("Failed to retreive value:", error.message);
        }
    }

    async setUnitValue(unit, value) {
        try {
            await AsyncStorage.setItem(`${this.namespace}:${unit}`, value);
        } catch (error) {
            console.log("Failed to set value:", error.message);
        }
    }

    async removeUnitValue(unit) {
        try {
        await AsyncStorage.removeItem(`${this.namespace}:${unit}`);
        } catch (error) {
            console.log("Failed to remove value:", error.message);
        }
    }

    async getAllKeys() {
        let keys = await AsyncStorage.getAllKeys();
        return keys;
    }
}

export default UnitStorage;