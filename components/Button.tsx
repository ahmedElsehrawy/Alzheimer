import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { Ionicons } from "@expo/vector-icons";

interface componentNameProps {
  title?: string;
  buttonFunction: any;
  styles?: object;
  textStyle?: object;
  icon?: any;
}

const CustomButton = (props: componentNameProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, ...props.styles }}
      onPress={props.buttonFunction}
    >
      {props.icon && <Ionicons name={props.icon} size={26} color="white" />}
      {props.title && (
        <Text style={{ ...styles.text, ...props.textStyle }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    backgroundColor: colors.green,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 15,
  },
  text: {
    color: colors.white2,
    fontSize: fonts.large,
    fontWeight: "600",
    marginHorizontal: 5,
  },
});
