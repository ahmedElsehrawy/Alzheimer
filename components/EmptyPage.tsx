import { Image, StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

interface EmptyPageProps {
  text: string;
}

const EmptyPage = (props: EmptyPageProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 600,
      }}
    >
      <Image
        source={require("../assets/nodata.png")}
        style={{ width: 160, height: 160 }}
      />
      <CustomText children={props.text} />
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({});
