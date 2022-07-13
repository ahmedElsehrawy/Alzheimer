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
import { setToken } from "../../modules/auth";
import { AuthContext } from "../../modules/store";
import { userTypes } from "../../constants";
import { ME } from "../WelcomeScreen";
import { GET_CONTACTS } from "../Contacts";
import { GET_UPDATES } from "../Updates";

interface componentNameProps {
  navigation: any;
}

const SIGN_IN_MUTATION = gql`
  mutation Signin($password: String!, $email: String) {
    signin(password: $password, email: $email) {
      user {
        role
      }
      token
    }
  }
`;

const SignInScreen = (props: componentNameProps) => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: {
      password: password,
      email: email,
    },
    refetchQueries: [
      { query: ME },
      { query: GET_CONTACTS },
      {
        query: GET_UPDATES,
        variables: {
          variables: {
            where: {
              type: {
                equals: "UPDATE",
              },
            },
            orderBy: {
              id: "desc",
            },
          },
        },
      },
    ],
    onCompleted: (data) => {
      console.log("🚀 ~ file: index.tsx ~ line 51 ~ SignInScreen ~ data", data);

      setToken(data?.signin?.token, data?.signin?.user?.role)
        .then(() => {
          if (data?.signin?.user?.role === userTypes.CARE_GIVER) {
            setIsAdmin(true);
            setLoggedIn(true);
          } else {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: index.tsx ~ line 63 ~ SignInScreen ~ err",
            err
          );
        });
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
