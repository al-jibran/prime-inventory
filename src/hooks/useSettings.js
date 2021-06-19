import { useState, useContext, useEffect } from "react";
import DeviceStorageContext from "../contexts/DeviceStorageContext";

export const useSettings = (key) => {
  const [setting, setSetting] = useState("");
  const deviceStorage = useContext(DeviceStorageContext);

  useEffect(() => {
    getValue().then(value => { setSetting(value); });
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
      const updatedValue = await deviceStorage.setValueStored(key, value);
      getValue().then(value => setSetting(value));
      console.log(updatedValue);
    } catch (error) {
      console.log("Error in setValue:", error.message);
    }
  };

  const removeValue = async () => {
    try {
      await deviceStorage.removeValueStored(key);
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
      setValue,
      removeValue,
      getAllSettings
    }
  ];
};