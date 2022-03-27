import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface componentNameProps {}

const Profile = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
});
