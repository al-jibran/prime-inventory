import React from "react";

import Form from "./Form";
import { useDropDown } from "../../hooks/useDropDown";
import { Heading } from "../Text";
import styled from "styled-components/native";

const AddEntryContainer = styled.View`
  margin-top: 10px;
  flex-shrink 1;
`;

const AddEntry = ({ entries, setEntries }) => {
  const { getValueForItem } = useDropDown("units");

  const onSaveEntry = ({ stock, name, _id, unit }, { resetForm }) => {
    const changeBy = getValueForItem(unit);
    stock *= changeBy;

    setEntries(entries.concat({ _id, name, stock }));
    resetForm();
  };

  return (
    <AddEntryContainer>
      <Heading>Add an entry</Heading>
      <Form onSubmit={onSaveEntry} />
    </AddEntryContainer>
  );
};

export default AddEntry;
