import { Alert } from "react-native";

export const CustomError = (title, message) => {
  Alert.alert(title, message);
};
