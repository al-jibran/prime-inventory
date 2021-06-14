import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import Constants from 'expo-constants';

const Toolbar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Container = styled.View`
    margin-top: ${Constants.statusBarHeight}px;
    margin-left: 60px;
    margin-right: 60px;
`;


const Main = () => {
    return (
        <Container>
            <Toolbar>
                <Text>Hello</Text>
                <Text>World</Text>
                <Text>Howdy</Text>
            </Toolbar>
        </Container>
    );
};

export default Main;