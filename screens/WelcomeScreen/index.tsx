import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import Header from "../../components/Header";
import { gql, useQuery } from "@apollo/client";

import styles from "./styles";
import Loader from "../../components/Loader";
import { AuthContext, getToken } from "../../util";

export const ME = gql`
  query Me {
    me {
      id
      email
      name
      phone
      password
      avatar
      role
    }
  }
`;

interface componentNameProps {
  navigation: any;
}

const WelcomeScreen = (props: componentNameProps) => {
  const [token, setToken] = useState(null);
  const { setLoggedIn } = useContext(AuthContext);

  const { data, loading } = useQuery(ME, {
    skip: token === null,
    onCompleted: (data) => {
      if (data?.me) {
        console.log("me", data?.me);
        setLoggedIn(true);
      }
    },
    onError: () => {
      setLoggedIn(false);
    },
  });

  useEffect(() => {
    getToken()
      .then((t) => {
        setToken(t);
      })
      .catch((err) => {
        console.log(err);
        setToken(null);
        setLoggedIn(false);
      });
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container}>
        <CustomText styles={styles.textLine}>Welcome</CustomText>
        <CustomText styles={styles.textLine}>
          What would you like to do?
        </CustomText>
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
