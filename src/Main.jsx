import React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Inventory from './screens/Inventory';

const Container = styled.View`
    margin-top: ${Constants.statusBarHeight}px;
    margin-left: 40px;
    margin-right: 40px;
`;

const Main = () => {
    return (
        <Container>
            <Inventory />
        </Container>
    );
};

export default Main;