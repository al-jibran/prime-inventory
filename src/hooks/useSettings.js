import { useState, useContext, useEffect } from "react";
import DeviceStorageContext from "../contexts/DeviceStorageContext";
import { capitalize } from "lodash";

// name will be used to get settings with a particular key
// while creating context, use settings:key for settings

// UnitStorageContext.js should be retitled to DeviceStorageContext.js
// utilities/unitStorage.js should be retitled to deviceStorage.js
// In App.jsx, change unitStorage to settingStorage with DeviceStorage(setting)


export const useSettings = ({ name }) => {
  const [items, setItems] = useState([]);
  const unitStorage = useContext(DeviceStorageContext);

  useEffect(() => {
    unitStorage.getAllKeys()
      .then(keys => {
        const unitItems = keys.map((key) => {
          const unit = key.split(':')[1];
          return ({ label: capitalize(unit), value: unit });
        });
        setItems(unitItems);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  return {
    items
  };
};