import React from "react";
import { Text } from "../../components/Text";
import styled from "styled-components/native";
import { TopContainerStyle } from "../../styles/common";

const DateForm = styled.View`
  ${TopContainerStyle}
`;

const DateHistory = () => {
  return (
    <DateForm>
      <Text>Hello World</Text>
    </DateForm>
  );
};

export default DateHistory;
