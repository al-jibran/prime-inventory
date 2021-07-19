import React from "react";
import {
  Modal as NativeModal,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

const Modal = ({ visible, children }) => {
  return (
    <NativeModal
      animated
      animationType={"fade"}
      transparent={true}
      visible={visible}
    >
      <KeyboardAvoidingView behavior="position">
        {children}
      </KeyboardAvoidingView>
    </NativeModal>
  );
};

export default Modal;
