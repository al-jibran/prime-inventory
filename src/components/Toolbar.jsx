import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';


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
            <Text>Add</Text>
        </ToolbarStyle>
    );
};

export default Toolbar;