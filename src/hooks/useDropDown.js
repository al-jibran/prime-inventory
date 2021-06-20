import { useState, useEffect } from "react";
import { useSettings } from "./useSettings";
import { capitalize } from 'lodash';

export const useDropDown = () => {
  const [setting,] = useSettings('units');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const units = setting && JSON.parse(setting);
    const keys = Object.keys(units);

    const items = keys.map(key => ({ label: capitalize(key), value: key }));
    setItems(items);
  }, [setting]);

  const handleDropDownSubmit = () => {

  };

  return [
    items,
    setItems,
    handleDropDownSubmit
  ];
};