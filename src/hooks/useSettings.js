import { useState, useContext, useEffect } from "react";
import DeviceStorageContext from "../contexts/DeviceStorageContext";

export const useSettings = (key) => {
  const [setting, setSetting] = useState("");
  const deviceStorage = useContext(DeviceStorageContext);

  useEffect(() => {
    getValue().then(value => { setSetting(value); })
    .catch(error => console.log('error', error.message));
  }, []);

  const getValue = async () => {
    try {
      const value = await deviceStorage.getValueStored(key);
      return value;
    } catch (error) {
      throw `Error in getValue: error.message`;
    }
  };

  const setValue = async (value) => {
    try {
      await deviceStorage.setValueStored(key, value);
      const result = await getValue();
      setSetting(result);
    } catch (error) {
      console.log("Error in setValue:", error.message);
    }
  };

  const removeValue = async () => {
    try {
      await deviceStorage.removeValueStored(key);
      getValue().then(value => setSetting(value));
    } catch (error) {
      console.log("Error in removeValue:", error.message);
    }
  };

  const getAllSettings = async () => {
    try {
      const keys = await deviceStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.log("Error in getAllSettings:", error.message);
    }
  };

  return [
    setting,
    {
      getValue,
      setValue,
      removeValue,
    },
    getAllSettings
  ];
};