import React from "react";
import { useReactiveVar } from "@apollo/client";
import styled from "styled-components/native";
import { Alert } from "react-native";

import Form from "./Form";
import { useDropDown } from "../../hooks/useDropDown";
import { Heading } from "../../components/Text";
import { selectedProduct } from "../../../Cache";

const AddEntryContainer = styled.View`
  margin-top: 10px;
  flex-shrink 1;
`;

const AddEntry = ({ entries, setEntries }) => {
  const { getValueForItem } = useDropDown("units");
  const selectedItem = useReactiveVar(selectedProduct);

  const onSaveEntry = ({ stock, unit }, { resetForm }) => {
    const changeBy = getValueForItem(unit);
    stock *= changeBy;
    const stockLeft = selectedItem.stock + stock;

    if (stockLeft < 0) {
      const alertButtons = [
        { text: "No", onPress: () => null },
        {
          text: "Yes",
          onPress: () => setEntriesAndReset(-selectedItem.stock, { resetForm }),
        },
      ];
      Alert.alert(
        "Stock",
        `Reducing the stock by ${stock} will reduce it below zero.\n\nReduce it to 0 instead?`,
        alertButtons
      );
      return;
    }
    setEntriesAndReset(stock, { resetForm });
  };

  const setEntriesAndReset = (stock, { resetForm }) => {
    setEntries(
      entries.concat({
        _id: selectedItem._id,
        name: selectedItem.name,
        stock,
      })
    );
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
