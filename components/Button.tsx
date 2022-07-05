import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { Ionicons } from "@expo/vector-icons";

interface componentNameProps {
  title?: string;
  buttonFunction: any;
  styles?: object;
  textStyle?: object;
  icon?: any;
  iconColor?: any;
  iconSize?: Number;
}

const CustomButton = (props: componentNameProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, ...props.styles }}
      onPress={props.buttonFunction}
    >
      {props.icon && (
        <Ionicons
          name={props.icon}
          size={props.iconSize ? props.iconSize : 26}
          color={props.iconColor ? props.iconColor : "white"}
        />
      )}
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
    height: 45,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.blue2,
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
    fontSize: fonts.medium,
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
