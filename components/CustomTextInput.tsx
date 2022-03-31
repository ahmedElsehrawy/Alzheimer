import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

interface componentNameProps {
  placeholder?: string;
  onChangeText?: any;
  value: any;
  style?: any;
  editable?: boolean;
  onPressIn?: any;
}

const CustomTextInput = (props: componentNameProps) => {
  let outStyle = props.style ? props.style : {};
  return <TextInput {...props} style={{ ...styles.textInput, ...outStyle }} />;
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 26,
    width: "80%",
    borderWidth: 1,
    borderColor: colors.gray,
    marginVertical: 15,
    fontSize: fonts.small,
  },
});
