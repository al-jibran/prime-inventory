import React, { useState } from "react";
import styled from "styled-components";
import { View, Pressable, Alert } from "react-native";
import { ShadowBox } from "../styles/common";

const Toggle = styled.View`
  display: ${(props) => (props.visible ? "flex" : "none")}};
`;

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 0 }}>
      <Pressable onPress={() => setVisible(!visible)}>{children[0]}</Pressable>
      <Toggle visible={visible}>{children[1]}</Toggle>
    </View>
  );
};

export default Togglable;
