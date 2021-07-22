import React from "react";
import * as yup from "yup";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/core";
import { FieldStyle } from "../../styles/common";
import { TextInput } from "../../components/InputField";
import FormHandler from "../../components/Form";
import { Text } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";
import { Alert } from "react-native";

const SettingModal = ({ name, setting }) => {
  const value =
    typeof setting.value === "number"
      ? setting.value.toString()
      : setting.value;
  const initialValue = { setting: value };
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    setting: yup[typeof setting.value]()
      .required("Cannot submit an empty field")
      .typeError(`The value must be a ${typeof setting.value}`),
  });

  const onCancel = () => {
    navigation.navigate("SettingPage");
  };

  const onSubmit = ({ setting }) => {
    if (typeof parseInt(setting) === "number" && setting < 1) {
      Alert.alert("Invalid change", "The value must be a positive integer.");
      return;
    }
  };

  return (
    <FormHandler
      heading={name}
      initialValue={initialValue}
      validationSchema={validationSchema}
      onReset={onCancel}
      onSubmit={onSubmit}
    >
      <FormView setting={setting.key} />
    </FormHandler>
  );
};

const FormView = ({ setting }) => {
  const title = capitalize(setting);
  return (
    <FieldStyle layout="horizontal">
      <Text>{title}</Text>
      <TextInput name={`setting`} autoCapitalize="words" width="50%" />
    </FieldStyle>
  );
};

export default SettingModal;
