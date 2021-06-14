import React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Inventory from './screens/Inventory';

const Container = styled.View`
    margin-top: ${Constants.statusBarHeight + 15}px;
    padding-left: 30px;
    padding-right: 30px;
`;

const Main = () => {
    return (
        <Container>
            <Inventory />
        </Container>
    );
};

export default Main;