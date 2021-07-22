import React from "react";
import { View } from "react-native";
import { capitalize } from "lodash";
import { Text } from "../../components/Text";
import FormHandler from "../../components/Form";
import { TextInput } from "../../components/InputField";
import { FieldStyle } from "../../styles/common";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/core";

const initialValue = {
  name: "",
  value: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name of the setting is required."),
  value: yup.string().required("Value of the setting is required."),
});

const AddSettingModal = ({ name, typeOfValues }) => {
  const navigation = useNavigation();

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <FormHandler
      heading={`Add New ${name}`}
      initialValue={initialValue}
      validationSchema={validationSchema}
      onReset={onCancel}
    >
      <FormView setting={name} />
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
