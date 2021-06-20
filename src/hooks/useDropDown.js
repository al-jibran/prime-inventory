import { useState, useEffect } from "react";
import { useSettings } from "./useSettings";
import { capitalize } from 'lodash';

export const useDropDown = (name) => {
  const [setting,] = useSettings(name);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const units = setting && JSON.parse(setting);
    const keys = Object.keys(units);

    const items = keys.map(key => ({ label: capitalize(key), value: key }));
    setItems(items);
  }, [setting]);

  const getValueForItem = (key) => {
    const units = setting && JSON.parse(setting);
    return Object.prototype.hasOwnProperty.call(units, key) ? units[key] : 1;
  };

  return {
    items,
    setItems,
    getValueForItem
  };
};