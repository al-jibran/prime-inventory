import React from "react";
import styled, { css } from "styled-components/native";
import Theme from "../theme";

const ButtonContainer = styled.Pressable`
  background-color: ${({ bgColor }) => {
    if (bgColor) {
      switch (bgColor) {
        case "primary":
          return Theme.color.primary;
        case "danger":
          return Theme.color.danger;
        case "success":
          return Theme.color.success;
        case "warning":
          return Theme.color.warning;
        default:
          return bgColor;
      }
    } else {
      return Theme.color.textPrimary;
    }
  }};

  ${({ bgColor }) =>
    bgColor === "white" &&
    css`
      border: 1px solid #ccc;
    `}

  ${({ padding }) => {
    if (padding) {
      return css`
        padding: ${(props) => props.padding || 0}px;
      `;
    }

    return css`
      padding-top: ${(props) => props.padTop || 8}px;
      padding-bottom: ${(props) => props.padBottom || 8}px;
      padding-left: ${(props) => props.padLeft || 5}px;
      padding-right: ${(props) => props.padRight || 5}px;
    `;
  }}
  
  
  width: ${(props) => props.width || "25"}%;
  ${({ rounded, borderColor }) =>
    rounded &&
    css`
      border-radius: 10px;
      border-color: ${borderColor || "#DDD"};
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `};
`;

const ButtonText = styled.Text`
  ${(props) =>
    props.alignText
      ? css`
          text-align: ${props.alignText};
          padding-left: 10px;
          padding-right: 10px;
        `
      : css`
          text-align: center;
        `};
  color: ${(props) =>
    props.color || props.bgColor === "white"
      ? Theme.color.textPrimary
      : "white"};
  font-weight: ${(props) => props.fontWeight || Theme.fontWeight.normal};
`;

const Button = ({ text, onPress, ...props }) => {
  return (
    <ButtonContainer onPress={onPress} {...props}>
      <ButtonText color={props.color} {...props}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

export default Button;
