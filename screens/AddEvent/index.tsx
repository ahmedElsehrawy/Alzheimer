import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface componentNameProps {}

const AddEvent = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {},
});
