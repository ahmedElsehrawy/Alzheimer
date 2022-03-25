import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

interface componentNameProps {
  title: string;
  buttonFunction: any;
  styles?: object;
}

const CustomButton = (props: componentNameProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, ...props.styles }}
      onPress={props.buttonFunction}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
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
  },
});
