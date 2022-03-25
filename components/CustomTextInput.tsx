import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

interface componentNameProps {
  placeholder: string;
  onChangeText: any;
}

const CustomTextInput = (props: componentNameProps) => {
  return <TextInput {...props} style={styles.textInput} />;
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
