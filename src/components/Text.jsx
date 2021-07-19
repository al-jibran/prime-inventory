import styled from "styled-components/native";
import Theme from "../theme";

export const Text = styled.Text`
  font-size: ${(props) => props.fontSize || Theme.fontSize.body}px;
  color: ${(props) => props.color || Theme.color.textPrimary};
  text-align: ${(props) => props.align || "left"};
`;

export const SubText = styled(Text)`
  font-size: ${(props) => props.fontSize || Theme.fontSize.subtext}px;
`;

export const Heading = styled(Text)`
  font-size: ${(props) => props.fontSize || Theme.fontSize.heading}px;
  font-weight: ${(props) => props.fontWeight || Theme.fontWeight.bold};
`;

export const SubHeading = styled(Heading)`
  font-size: ${(props) => props.fontSize || Theme.fontSize.subheading}px;
`;
