import React from 'react';
import styled from 'styled-components';
import { Pressable } from 'react-native';
import { Text } from './Text';


const ToolbarStyle = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Toolbar = ({visible, toggleModal}) => {
    const onPressAdd = () => toggleModal(!visible);


    return (
        <ToolbarStyle>
            <Text>Filter</Text>
            <Text>Inventory</Text>
            <Pressable onPress={onPressAdd}>
                <Text>Add</Text>
            </Pressable>
        </ToolbarStyle>
        
    );
};

export default Toolbar;