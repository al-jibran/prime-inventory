import React from 'react';
import styled, { css } from 'styled-components/native';
import Theme from '../theme';

const ButtonContainer = styled.Pressable`
  background-color: ${({ bgColor }) => {
    if (bgColor) {
      switch (bgColor) {
        case 'primary': return Theme.color.primary;
        case 'success': return Theme.color.success;
        case 'warning': return Theme.color.warning;
        default: return bgColor;
      }
    } else {
      return Theme.color.textPrimary;
    }
  }};

  ${({bgColor}) => bgColor === 'white' && css `border: 1px solid black;`}

  padding-top: ${props => props.padTop || 8}px;
  padding-bottom: ${props => props.padBottom || 8}px;
  padding-left: ${props => props.padLeft || 5}px;
  padding-right: ${props => props.padLeft || 5}px;
  width: ${props => props.width || '100'}px
  
  ${({ rounded }) => rounded && css`border-radius: 10px`};
`;


const ButtonText = styled.Text`
  text-align: center;
  color: ${props => props.color || props.bgColor === 'white' ? Theme.color.textPrimary : 'white'};
`;

const Button = ({ text, onPress, ...props }) => {
  return (
    <ButtonContainer onPress={onPress} {...props}>
      <ButtonText color={props.color} {...props}>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;