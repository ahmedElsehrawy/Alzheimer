import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

interface componentNameProps {
  navigation?: any;
}

const Header = (props: componentNameProps) => {
  return props.navigation ? (
    <View style={styles.header}>
      <View style={styles.goBack}>
        <TouchableOpacity
          style={styles.forgetPassword}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.forgetPasswordText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/icons/brain.png")}
        style={styles.headerIcon}
      />
      <Text style={styles.headerTitle}>Faker</Text>
    </View>
  ) : (
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
    backgroundColor: colors.white,
    zIndex: 100,
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
  goBack: {
    position: "absolute",
    top: 10,
    left: 20,
    fontSize: fonts.small,
    fontWeight: "500",
  },
  forgetPassword: {
    backgroundColor: colors.white,
    zIndex: 110,
  },
  forgetPasswordText: {
    color: colors.blue,
    fontSize: fonts.small,
  },
});
