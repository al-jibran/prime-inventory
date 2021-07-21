import React from "react";
import { ActivityIndicator } from "react-native";
import { NetworkStatus } from "@apollo/client";
import { HorizontalAndVerticalCenter } from "../styles/common";

const FetchMoreFooter = ({ networkStatus }) => {
  if (networkStatus === NetworkStatus.fetchMore) {
    return (
      <HorizontalAndVerticalCenter>
        <ActivityIndicator size="small" color="#0000ff" />
      </HorizontalAndVerticalCenter>
    );
  }
  return null;
};

export default FetchMoreFooter;
