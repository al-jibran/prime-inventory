import React, { useState } from "react";
import { View, Pressable } from "react-native";

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 0, flex: 1, justifyContent: "flex-end" }}>
      <Pressable onPress={() => setVisible(!visible)} style={{ flex: 1 }}>
        {children[0]}
      </Pressable>
      {visible && <View style={{ flex: 1 }}>{children[1]}</View>}
    </View>
  );
};

export default Togglable;
