import React from "react";
import styled from "styled-components/native";
import { Pressable, View } from "react-native";
import { Formik } from "formik";

import { Heading } from "./Text";
import { FormActions } from "../styles/common";
import Theme from "../theme";
import { Text } from "./Text";

const FormContainer = styled.View`
  background-color: white;
  padding: 25px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-top-color: ${Theme.color.danger};
  border: 2px solid;
`;

const FormHandler = ({
  initialValue,
  heading,
  children,
  onReset,
  onSubmit,
  validationSchema,
}) => {
  return (
    <FormContainer>
      <Heading style={{ marginBottom: 10 }}>{heading}</Heading>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {({ handleReset, handleSubmit }) => {
          return (
            <View>
              {children}
              <FormActions width="30">
                <Pressable onPress={handleReset}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleSubmit}>
                  <Text color={Theme.color.danger}>Save</Text>
                </Pressable>
              </FormActions>
            </View>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default FormHandler;
