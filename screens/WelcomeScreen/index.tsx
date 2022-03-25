import * as React from "react";
import { Text, View } from "react-native";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";
import styles from "./styles";

interface componentNameProps {
  navigation: any;
}

const WelcomeScreen = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.textLine}>Welcome</Text>
        <Text style={styles.textLine}>What would you like to do?</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign Up"
            buttonFunction={() => {
              props.navigation.navigate("SignUp");
            }}
          />
          <CustomButton
            title="Login"
            buttonFunction={() => {
              props.navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
