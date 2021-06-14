import React from 'react';
import Toolbar from './components/Toolbar';
import styled from 'styled-components';
import Constants from 'expo-constants';

const Container = styled.View`
    margin-top: ${Constants.statusBarHeight}px;
    margin-left: 60px;
    margin-right: 60px;
`;

const Main = () => {
    return (
        <Container>
            <Toolbar />
        </Container>
    );
};

export default Main;