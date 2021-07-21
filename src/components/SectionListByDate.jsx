import React from "react";
import { SectionList, View } from "react-native";
import { Heading } from "./Text";

const SectionListByDate = (props) => {
  const dates = new Set();

  for (let item of props.data) {
    dates.add(
      new Date(item.created).toLocaleDateString("en-us", {
        day: "2-digit",
        year: "numeric",
        month: "long",
      })
    );
  }

  let sectionData = [];
  for (let date of dates.values()) {
    const sameDateHistory = props.data.filter(
      (data) =>
        new Date(data.created).toLocaleDateString("en-us", {
          day: "2-digit",
          year: "numeric",
          month: "long",
        }) === date
    );

    const sectionItem = {
      title: date,
      data: sameDateHistory,
    };

    sectionData.push(sectionItem);
  }

  return (
    <SectionList
      sections={sectionData}
      keyExtractor={(item) => item._id}
      stickySectionHeadersEnabled={false}
      style={{ marginTop: 20 }}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ marginTop: 15 }}>
          <Heading>{title}</Heading>
        </View>
      )}
      contentContainerStyle={{ marginLeft: 20, marginRight: 20, flexGrow: 1 }}
      {...props}
    />
  );
};

export default SectionListByDate;
