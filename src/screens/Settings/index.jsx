import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";

const Setting = () => {
  const [, , getAllSettings] = useSettings();
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const initSettings = async () => {
      const settings = await getAllSettings();
      if (isMounted) setSettings(settings);
    };

    initSettings();
    return () => (isMounted = false);
  }, []);

  return <Text>{settings[0]}</Text>;
};

export default Setting;
