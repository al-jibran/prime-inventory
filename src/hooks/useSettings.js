import { useState, useContext, useEffect } from "react";
import DeviceStorageContext from "../contexts/DeviceStorageContext";
import { capitalize } from "lodash";

export const useSettings = (key) => {
  const [setting, setSetting] = useState(null);
  const deviceStorage = useContext(DeviceStorageContext);

  useEffect(() => {
    getValue()
      .then((value) => {
        setSetting(value);
      })
      .catch((error) => console.log("error", error.message));
  }, []);

  const getValue = async () => {
    try {
      const value = await deviceStorage.getValueStored(key);
      return JSON.parse(value);
    } catch (error) {
      throw `Error getting value for setting: ${error.message}`;
    }
  };

  const setValue = async (value) => {
    try {
      await deviceStorage.setValueStored(key, value);
      const result = await getValue();
      setSetting(result);
    } catch (error) {
      throw `Error setting value for setting: ${error.message}`;
    }
  };

  const removeValue = async () => {
    try {
      await deviceStorage.removeValueStored(key);
      getValue().then((value) => setSetting(JSON.parse(value)));
    } catch (error) {
      throw `Error removing value for setting: ${error.message}`;
    }
  };

  const getAllSettings = async () => {
    try {
      const keys = await deviceStorage.getAllKeys();
      const settingNames = keys.map((setting) => {
        const settingName = setting.split(":")[1];
        return capitalize(settingName);
      });
      return settingNames;
    } catch (error) {
      throw `Error getting settings: ${error.message}`;
    }
  };

  return [
    setting,
    {
      getValue,
      setValue,
      removeValue,
    },
    getAllSettings,
  ];
};
