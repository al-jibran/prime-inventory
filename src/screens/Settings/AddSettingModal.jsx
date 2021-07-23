import React from "react";
import { View, Alert } from "react-native";
import { Text } from "../../components/Text";
import FormHandler from "../../components/Form";
import { TextInput } from "../../components/InputField";
import { FieldStyle } from "../../styles/common";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/core";
import { useSettings } from "../../hooks/useSettings";

const initialValue = {
  name: "",
  value: "",
};

const AddSettingModal = ({ typeOfValues, settingName }) => {
  const navigation = useNavigation(settingName);
  console.log(settingName);
  const [dataInStorage, { setValue }] = useSettings(settingName);
  console.log(typeOfValues);

  const validationSchema = yup.object().shape({
    name: yup.string().required("The name of the setting is required"),
    value: yup[typeOfValues]()
      .required("The value of the setting is required")
      .typeError(`The value must be a ${typeOfValues}`),
  });

  const onSubmit = async ({ name, value }) => {
    name = name.toLowerCase();
    const isNumber = typeof parseInt(value) === "number";
    const receivedValue = isNumber ? parseInt(value) : value;

    /* 
    checks if the original setting is a number and if the value received from form is negative.
    Note: NaN will result in false.
    */
    if (isNumber && receivedValue < 1) {
      Alert.alert("Invalid change", "The value must be a positive number.");
      return;
    }

    if (typeof dataInStorage === "object") {
      const res = {};
      res[name] = value;
      await setValue({ ...dataInStorage, ...res });
    }

    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <FormHandler
      heading={`Add new setting`}
      initialValue={initialValue}
      validationSchema={validationSchema}
      onReset={onCancel}
      onSubmit={onSubmit}
    >
      <FormView />
    </FormHandler>
  );
};

const FormView = () => {
  return (
    <View>
      <FieldStyle layout="horizontal">
        <Text>Name</Text>
        <TextInput name="name" width="50%" />
      </FieldStyle>
      <FieldStyle layout="horizontal">
        <Text>Value</Text>
        <TextInput name="value" width="50%" />
      </FieldStyle>
    </View>
  );
};

export default AddSettingModal;
