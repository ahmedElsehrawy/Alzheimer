import React from "react";
import { StyleSheet, View } from "react-native";
//@ts-ignore
import { BarIndicator } from "react-native-indicators";
import colors from "../theme/colors";

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <BarIndicator color={colors.blue2} count={6} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
