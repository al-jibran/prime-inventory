import React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Inventory from './screens/Inventory';

const Container = styled.SafeAreaView`
    margin-top: ${Constants.statusBarHeight + 15}px;
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