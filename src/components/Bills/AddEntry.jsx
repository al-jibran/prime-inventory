import React from 'react';
import { View } from 'react-native';

import Form from './Form';
import { useDropDown } from '../../hooks/useDropDown';
import { Heading } from '../Text';

const AddEntry = ({ entries, setEntries }) => {
  const { getValueForItem } = useDropDown('units');

  const onSaveEntry = ({ stock, name, id, unit }, { resetForm }) => {
    const changeBy = getValueForItem(unit);
    stock *= changeBy;

    setEntries(entries.concat({ id, name, stock }));
    resetForm();
  };

  return (
    <View style={({ marginTop: 10 })}>
      <Heading>Add an entry</Heading>
      <Form onSubmit={onSaveEntry} />
    </View>
  );
};

export default AddEntry;