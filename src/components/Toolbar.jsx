import React from 'react';
import styled from 'styled-components';
import { Pressable, Alert } from 'react-native';
import { Text } from './Text';


const ToolbarStyle = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Toolbar = () => {
    return (
        <ToolbarStyle>
            <Text>Filter</Text>
            <Text>Inventory</Text>
            <Pressable onPress={() => { Alert.alert("Clicked On", "Add"); }}>
                <Text>Add</Text>
            </Pressable>
        </ToolbarStyle>
    );
};

export default Toolbar;