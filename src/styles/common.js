import styled from 'styled-components';
import Constants from 'expo-constants';

export const Container = styled.View`
margin-top: ${Constants.statusBarHeight + 15}px;
padding-left: ${props => props.padLeft}px;
padding-right: ${props => props.padRight}px;
`;
