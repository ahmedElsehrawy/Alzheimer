import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface componentNameProps {}

const HomeScreen = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
