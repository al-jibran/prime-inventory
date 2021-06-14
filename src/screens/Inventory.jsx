import React from 'react';
import Toolbar from '../components/Toolbar';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

const SearchStyle = styled.TextInput`
    margin-top: 20px;
    border: 1px solid black;
    width: 100%;
    border-radius: 30px;
    padding: 5px;
`;

const Inventory = () => {
    return (
        <View>
            <Toolbar />
            <SearchStyle placeholder="Search" clearButtonMode='while-editing'/>
        </View>
    );
};

export default Inventory;