import React, { useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomTextInput from "../../components/CustomTextInput";
import Header from "../../components/Header";
import styles from "./styles";

interface componentNameProps {
  navigation: any;
}

const SignInScreen = (props: componentNameProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.goBack}>
          <TouchableOpacity
            style={styles.forgetPassword}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.forgetPasswordText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.grayText}>Welcome Back</Text>
          <Text style={styles.letsLogYouIn}>Lets Log You In</Text>
          <CustomTextInput
            placeholder="Your Email Address"
            onChangeText={(text: string) => setEmail(text)}
          />
          <CustomTextInput
            placeholder="Your Password"
            onChangeText={(text: string) => setPassword(text)}
          />
          <CustomButton
            title="Done"
            styles={{ width: "80%" }}
            buttonFunction={() => {}}
          />
          <TouchableOpacity style={styles.forgetPassword} onPress={() => {}}>
            <Text style={styles.forgetPasswordText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
