import { useState, useEffect } from "react";
import { useSettings } from "./useSettings";
import { capitalize } from "lodash";

export const useDropDown = (name) => {
  const [setting] = useSettings(name);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const units = setting;
    const keys = units ? Object.keys(units) : [];

    const items = keys.map((key) => ({ label: capitalize(key), value: key }));
    if (isMounted) setItems(items);

    return () => (isMounted = false);
  }, [setting]);

  const getValueForItem = (key) => {
    const units = setting && setting;
    return Object.prototype.hasOwnProperty.call(units, key) ? units[key] : 1;
  };

  return {
    items,
    setItems,
    getValueForItem,
  };
};
