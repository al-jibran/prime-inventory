import React, { useState } from "react";
import styled from "styled-components";
import { View, Pressable } from "react-native";
import { Text } from "./Text";
import { TransactionDetails } from "../screens/Product";

const Toggle = styled(TransactionDetails)`
  margin: 0;
  margin-bottom: 30px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setVisible(!visible)}>{children}</Pressable>
      <Toggle visible={visible}>{children}</Toggle>
    </View>
  );
};

export default Togglable;
