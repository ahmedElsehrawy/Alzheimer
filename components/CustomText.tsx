import * as React from "react";
import { Text } from "react-native";

interface componentNameProps {
  children: string;
  styles?: any;
}

const CustomText = (props: componentNameProps) => {
  return (
    <Text style={{ fontFamily: "Roboto-Medium", ...props.styles }}>
      {props.children}
    </Text>
  );
};

export default CustomText;
