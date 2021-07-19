import styled from "styled-components/native";

// change paddings to 20 if there's no need for custom padding
export const Container = styled.View`
  padding-left: ${(props) => props.padLeft || 25}px;
  padding-right: ${(props) => props.padRight || 25}px;
  padding-top: ${(props) => props.padTop || 0}px;
  padding-bottom: ${(props) => props.padBottom || 0}px;
  margin-top: ${(props) => props.mTop || 0}px;
  margin-bottom: ${(props) => props.mBottom || 0}px;
  margin-left: ${(props) => props.mLeft || 0}px;
  margin-right: ${(props) => props.mRight || 0}px;
  flex: 1;
`;

export const FieldStyle = styled.View`
  flex-direction: ${(props) =>
    props.layout === "horizontal" ? "row" : "column"};
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SearchInput = styled.TextInput`
  border: 1px solid black;
  width: 100%;
  border-radius: 30px;
  padding: 6px;
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
  width: 100%;
  shadow-color: #ddd;
  shadow-offset: 1px 1px;
  shadow-opacity: 1;
  shadow-radius: 3px;
  elevation: 5;
  background-color: #fff;
`;
