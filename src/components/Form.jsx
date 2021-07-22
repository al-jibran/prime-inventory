import React from "react";
import styled from "styled-components/native";
import { Formik } from "formik";

import { Heading } from "./Text";
import Theme from "../theme";

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
  FormView,
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
            <FormView handleReset={handleReset} handleSubmit={handleSubmit} />
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default FormHandler;
