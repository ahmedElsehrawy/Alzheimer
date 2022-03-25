import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

interface componentNameProps {}

const Header = (props: componentNameProps) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/icons/brain.png")}
        style={styles.headerIcon}
      />
      <Text style={styles.headerTitle}>Faker</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontSize: fonts.large,
    fontWeight: "bold",
    color: colors.black2,
    marginHorizontal: 8,
  },
});
