import { Platform } from "react-native";
const Theme = {
  fontSize: {
    heading: 18,
    subheading: 16,
    body: 14,
    subtext: 11,
  },

  fontWeight: {
    light: 200,
    normal: 400,
    bold: Platform.OS === "android" ? "bold" : 600,
  },

  color: {
    textPrimary: "#000000",
    textSecondary: "#ABABAB",
    primary: "#1EB8E1",
    danger: "#FB1D1D",
    success: "#2EDF66",
    warning: "#FBCA1D",
  },
};

export default Theme;
