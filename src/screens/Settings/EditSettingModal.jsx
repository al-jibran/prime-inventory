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

const EditSettingModal = ({ name, property }) => {
  const [, operations] = useSettings(name);
  const isNumber = typeof property.value === "number";

  const value = isNumber ? property.value.toString() : property.value;
  const initialValue = { setting: value };
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    setting: yup[typeof property.value]()
      .required("Cannot submit an empty field")
      .typeError(`The value must be a ${typeof property.value}`),
  });

  const onCancel = () => {
    navigation.navigate("SettingPage");
  };

  const onSubmit = async ({ setting }) => {
    const receivedNumber = parseInt(setting);
    const dataInStorage = await operations.getValue();

    /* 
    checks if the original setting is a number and if the value received from form is negative.
    Note: NaN will result in false.
    */
    if (isNumber && receivedNumber < 1) {
      Alert.alert("Invalid change", "The value must be a positive number.");
      return;
    } else if (receivedNumber) {
      setting = receivedNumber;
    }
    if (typeof dataInStorage === "object") {
      const key = property.key;
      let res = {};
      res[key] = setting;
      res = { ...dataInStorage, ...res };
      if (name === "color-range" && res.warning <= res.low) {
        console.log(res);
        Alert.alert("Warning must be greater than Low");
        return;
      }
      await operations.setValue(res);
    }
    navigation.goBack();
  };

  return (
    <FormHandler
      heading={capitalize(name)}
      initialValue={initialValue}
      validationSchema={validationSchema}
      onReset={onCancel}
      onSubmit={onSubmit}
    >
      <FormView setting={property.key} />
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

export default EditSettingModal;
