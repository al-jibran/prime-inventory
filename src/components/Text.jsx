import styled from "styled-components/native";
import Theme from "../theme";

export const Text = styled.Text`
  font-size: ${(props) => props.fontSize || Theme.fontSize.body}px;
  color: ${(props) => props.color || Theme.color.textPrimary};
  text-align: ${(props) => props.align || "left"};
  margin: ${(props) => props.mTopBottom || 0}px
    ${(props) => props.mLeftRight || 0}px;
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

export const AdaptiveText = styled(Text)`
  color: ${({ children }) => {
    const text = children[1] ? parseInt(children[1]) : children;
    if (text > 0) {
      return Theme.color.success;
    } else if (text < 0) {
      return Theme.color.danger;
    }
    return Theme.color.textPrimary;
  }};
`;
