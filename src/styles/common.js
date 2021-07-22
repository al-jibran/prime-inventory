import styled, { css } from "styled-components/native";

// change paddings to 20 if there's no need for custom padding
export const Container = styled.View`
  flex: 1;
  margin-left: ${(props) => (props.mLeft ? props.mLeft : "20")}px;
  margin-right: ${(props) => (props.mRight ? props.mRight : "20")}px;
  border: ${(props) => props.border || "none"};
`;

export const FieldStyle = styled.View`
  flex-direction: ${(props) =>
    props.layout === "horizontal" ? "row" : "column"};
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FormActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-end;
  width: ${({ width }) => width || "100"}%;
  margin-top: 10px;
  z-index: -10000;
`;

export const ShadowBox = styled.View`
  width: 99%;
  shadow-color: #ddd;
  shadow-offset: 1px 1px;
  shadow-opacity: 1;
  shadow-radius: 3px;
  elevation: 5;
  background-color: #fff;
`;

export const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.mTop || 5}px;
  margin-bottom: ${(props) => props.mBottom || 5}px;
`;

export const TopContainerStyle = css`
  flex-shrink: 1;
  margin-bottom: 30px;
`;

export const HorizontalAndVerticalCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AlignBySide = css`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;
