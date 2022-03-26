import React, { useEffect, useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomTextInput from "../../components/CustomTextInput";
import Header from "../../components/Header";
import styles from "./styles";

interface componentNameProps {
  navigation: any;
  route: any;
}

const ProcceedScreen = (props: componentNameProps) => {
  const { route, navigation } = props;
  const [user, setUser] = useState({
    fullName: "",
    emailAddress: "",
    confirmEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    type: route.params.type,
  });

  const onChangeUserData = (changeObject: object) => {
    setUser({ ...user, ...changeObject });
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomTextInput
              placeholder="Your Full Name"
              value={user.fullName}
              onChangeText={(text: string) =>
                onChangeUserData({ fullName: text })
              }
            />
            <CustomTextInput
              placeholder="Your Email Address"
              value={user.emailAddress}
              onChangeText={(text: string) =>
                onChangeUserData({ emailAddress: text })
              }
            />

            <CustomTextInput
              placeholder="Confirm Email Address"
              value={user.confirmEmail}
              onChangeText={(text: string) =>
                onChangeUserData({ confirmEmail: text })
              }
            />

            <CustomTextInput
              placeholder="Your Phone Number"
              value={user.phoneNumber}
              onChangeText={(text: string) =>
                onChangeUserData({ phoneNumber: text })
              }
            />
            <CustomTextInput
              placeholder="Your Password"
              value={user.password}
              onChangeText={(text: string) =>
                onChangeUserData({ password: text })
              }
            />
            <CustomTextInput
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChangeText={(text: string) =>
                onChangeUserData({ confirmPassword: text })
              }
            />
            <CustomButton
              title="Next"
              styles={{ width: "80%" }}
              buttonFunction={() => {
                if (user.password !== user.confirmPassword) {
                  Alert.alert("error", "password doesn't match", [
                    { text: "Okay", onPress: () => {} },
                  ]);
                  return;
                }
                if (user.emailAddress !== user.confirmEmail) {
                  Alert.alert("error", "email doesn't match", [
                    { text: "Okay", onPress: () => {} },
                  ]);
                  return;
                }
                if (user.password.length < 8) {
                  Alert.alert("error", "password must be more than 8 digits", [
                    { text: "Okay", onPress: () => {} },
                  ]);
                  return;
                }
                if (
                  user.emailAddress === "" ||
                  user.phoneNumber === "" ||
                  user.fullName === ""
                ) {
                  Alert.alert("error", "please fill all the fields", [
                    { text: "Okay", onPress: () => {} },
                  ]);
                  return;
                }
                navigation.navigate("ProfilePic", { user: user });
              }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProcceedScreen;
