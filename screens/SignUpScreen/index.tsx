import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/Button";
import CustomTextInput from "../../components/CustomTextInput";
import Header from "../../components/Header";
import colors from "../../theme/colors";
import styles from "./styles";

interface componentNameProps {
  navigation: any;
}

const SignUpScreen = (props: componentNameProps) => {
  return (
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
        <Text style={styles.grayText}>Hello</Text>
        <Text style={styles.letsLogYouIn}>Tell Us Who You Are</Text>

        <CustomButton
          title="I'm a patient"
          styles={{ width: "80%", backgroundColor: colors.purple }}
          buttonFunction={() => {}}
        />
        <CustomButton
          title="I'm a caregiver"
          styles={{ width: "80%", backgroundColor: colors.green }}
          buttonFunction={() => {}}
        />
        <CustomButton
          title="I'm a family/frient"
          styles={{ width: "80%", backgroundColor: colors.orange }}
          buttonFunction={() => {}}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
