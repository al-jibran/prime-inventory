/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Alert, SectionList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { capitalize } from "lodash";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text, Heading } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";
import { Detail } from "../../styles/common";
import Theme from "../../theme";

const SettingItem = styled.Pressable`
  background-color: white;
  padding: 25px 20px;
  border: 1px solid #eee;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Settings = ({ navigation }) => {
  const [, { getValue }, getAllSettings] = useSettings();
  const [sectionData, setSectionData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const initSettings = async () => {
      const settings = await getAllSettings();
      const sectionData = [];

      for (let setting of settings) {
        const values = await getValue(setting.toLowerCase());
        const entries = values && Object.entries(values);

        sectionData.push({
          title: setting,
          data: entries ? entries : [],
        });
      }

      if (isMounted) {
        setSectionData(sectionData);
      }
    };

    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("triggered");
      await initSettings();
    });

    initSettings();
    return () => ((isMounted = false), unsubscribe);
  }, [refresh]);

  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  return (
    <SectionList
      sections={sectionData}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      stickySectionHeadersEnabled={false}
      keyExtractor={(_, i) => i.toString()}
      renderSectionHeader={({ section: { title, data } }) => (
        <Detail style={{ marginHorizontal: 20 }}>
          <Heading fontWeight={Theme.fontWeight.bold}>{title}</Heading>
          {title !== "Color-range" && (
            <Pressable
              onPress={() => {
                navigation.navigate("DisplayModal", {
                  screen: "AddSetting",
                  settingName: title.toLowerCase(),
                  typeOfValues: typeof data[0][1],
                });
              }}
            >
              <Ionicons name="add-circle-outline" size={24} />
            </Pressable>
          )}
        </Detail>
      )}
      renderItem={({ item, section }) => (
        <RenderSectionItem
          item={item}
          section={section}
          refreshScreen={refreshScreen}
        />
      )}
    />
  );
};

const RenderSectionItem = ({ item, section, refreshScreen }) => {
  const navigation = useNavigation();
  const [, { setValue }] = useSettings(section.title.toLowerCase());

  const key = item[0];
  const value = item[1];

  return (
    <SettingItem
      onLongPress={() =>
        Alert.alert(`Delete ${key}?`, "", [
          { text: "Cancel" },
          {
            text: "Yes",
            onPress: async () => {
              if (section.title === "Color-range") {
                Alert.alert("Cannot delete values from Color-range");
                return;
              }
              const newData = section.data.filter((prop) => prop[0] !== key);
              const obj = {};

              for (let key of newData) {
                obj[key[0]] = key[1];
              }
              await setValue(obj);
              refreshScreen();
            },
          },
        ])
      }
      onPress={() =>
        navigation.navigate("DisplayModal", {
          screen: "EditSetting",
          name: section.title.toLowerCase(),
          property: { key, value },
        })
      }
    >
      <Text>{capitalize(key)}</Text>
      <Text>{value}</Text>
    </SettingItem>
  );
};
