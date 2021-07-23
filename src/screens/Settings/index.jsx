/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Alert, SectionList, FlatList, Pressable, View } from "react-native";
import { capitalize } from "lodash";
import styled from "styled-components/native";

import { Text, SubHeading } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";

const SettingItem = styled.Pressable`
  background-color: white;
  padding: 15px;
  border: 1px solid #eee;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Settings = ({ navigation }) => {
  const [, { getValue }, getAllSettings] = useSettings();
  const [sectionData, setSectionData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Modify this method to change setting titles and their content.
    // Works for object.
    // see If a change is required to display array and other data types later.
    const initSettings = async () => {
      const settings = await getAllSettings();
      const sectionDataPromise = settings.map(async (setting) => {
        const values = await getValue(setting.toLowerCase());

        return {
          title: setting,
          data: Object.entries(values),
        };
      });
      if (isMounted) {
        const sectionData = await Promise.all(sectionDataPromise);
        setSectionData(sectionData);
      }
    };

    initSettings();
    return () => (isMounted = false);
  }, []);

  return (
    <SectionList
      sections={sectionData}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, i) => i.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ marginTop: 15 }}>
          <SubHeading>{title}</SubHeading>
        </View>
      )}
      renderItem={({ item }) => {
        const key = item[0];
        const value = item[1];
        console.log(item);

        return (
          <View>
            <SettingItem
              onLongPress={() =>
                Alert.alert(`Delete ${key}?`, "", [
                  { text: "Cancel" },
                  { text: "Yes", onPress: () => null },
                ])
              }
              onPress={() =>
                navigation.navigate("DisplayModal", {
                  action: "EditSetting",
                  name: section.title,
                  property: { key, value },
                })
              }
            >
              <Text>{capitalize(key)}</Text>
              <Text>{value}</Text>
            </SettingItem>
          </View>
        );
      }}
    />
  );
};

export const SettingPage = ({ navigation, route }) => {
  const [, operation] = useSettings(route.params.name);
  let [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const setting = await operation.getValue();
      const data = Object.entries(setting);
      navigation.setOptions({
        headerRight: () => (
          <AddSettingButton
            navigation={navigation}
            typeOfValues={typeof data[0][1]}
            settingName={route.params.name}
          />
        ),
        headerRightContainerStyle: { paddingRight: 20 },
      });
      setData(data);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => {
        const key = item[0];
        const value = item[1];

        return (
          <SettingItem
            onLongPress={() =>
              Alert.alert(`Delete ${key}?`, "", [
                { text: "Cancel" },
                { text: "Yes", onPress: () => null },
              ])
            }
            onPress={() =>
              navigation.navigate("DisplayModal", {
                action: "EditSetting",
                name: route.params.name,
                property: { key, value },
              })
            }
          >
            <Text>{capitalize(key)}</Text>
            <Text>{value}</Text>
          </SettingItem>
        );
      }}
    />
  );
};

const AddSettingButton = ({ navigation, typeOfValues, settingName }) => {
  const onPressAdd = () => {
    navigation.navigate("DisplayModal", {
      action: "AddSetting",
      typeOfValues,
      settingName,
    });
  };

  return (
    <Pressable onPress={onPressAdd}>
      <Text>Add</Text>
    </Pressable>
  );
};
