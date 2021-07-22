import { useState, useContext, useEffect } from "react";
import DeviceStorageContext from "../contexts/DeviceStorageContext";
import { capitalize } from "lodash";
import { useFocusEffect } from "@react-navigation/core";

export const useSettings = (key) => {
  const [setting, setSetting] = useState(null);
  const deviceStorage = useContext(DeviceStorageContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getValue()
        .then((value) => {
          setSetting(value);
        })
        .catch((error) => console.log("error", error.message));
    }

    return () => (isMounted = false);
  }, []);

  const getValue = async () => {
    try {
      const value = await deviceStorage.getValueStored(key);
      return value;
    } catch (error) {
      throw `Error getting value for setting: ${error.message}`;
    }
  };

  const getValueOfProperty = async (property) => {
    try {
      const settingObject = setting || (await getValue());
      return settingObject[property];
    } catch (error) {
      throw `Error getting value for property: ${property}`;
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
      getValueOfProperty,
    },
    getAllSettings,
  ];
};
