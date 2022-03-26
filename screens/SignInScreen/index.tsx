import React, { useState, useEffect, useContext } from "react";
import {
  Keyboard,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import Header from "../../components/Header";
import styles from "./styles";
import { gql, useMutation } from "@apollo/client";
import Loader from "../../components/Loader";
import { AuthContext, setToken } from "../../util";

interface componentNameProps {
  navigation: any;
}

const SIGN_IN_MUTATION = gql`
  mutation Signin($password: String!, $email: String) {
    signin(password: $password, email: $email) {
      token
    }
  }
`;

const SignInScreen = (props: componentNameProps) => {
  const { setLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: {
      password: password,
      email: email,
    },
    onCompleted: (data) => {
      console.log("completed", data);
      setToken(data?.signin?.token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    },
    onError: () => {
      setLoggedIn(false);
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomText styles={styles.grayText}>Welcome Back</CustomText>
            <CustomText styles={styles.letsLogYouIn}>
              Lets Log You In
            </CustomText>
            <CustomTextInput
              placeholder="Your Email Address"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
            <CustomTextInput
              placeholder="Your Password"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
            />
            <CustomButton
              title="Done"
              styles={{ width: "80%" }}
              buttonFunction={() => signIn()}
            />
            <TouchableOpacity style={styles.forgetPassword} onPress={() => {}}>
              <CustomText styles={styles.forgetPasswordText}>
                Forget Password
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
