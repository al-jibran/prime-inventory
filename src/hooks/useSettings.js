import { useState, useContext, useEffect } from "react";
import UnitStorageContext from "../contexts/UnitStorageContext";
import { capitalize } from "lodash";

// name will be used to get settings with a particular namespace
// while creating context, use settings:[setting-name]:key for settings
// [namespace]:[key] for anything else.

const useSettings = ({ name }) => {
  const [items, setItems] = useState([]);
  const unitStorage = useContext(UnitStorageContext);

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
};