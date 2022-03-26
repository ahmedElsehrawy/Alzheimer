import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { gql, useMutation } from "@apollo/client";
import CustomButton from "../../components/Button";
import Loader from "../../components/Loader";
import { AuthContext, setToken } from "../../util";

interface componentNameProps {
  route: any;
  navigation: any;
}

const SIGN_UP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $phone: String!
    $role: Role!
    $password: String!
    $avatar: String
    $name: String
  ) {
    signup(
      email: $email
      phone: $phone
      role: $role
      password: $password
      avatar: $avatar
      name: $name
    ) {
      token
    }
  }
`;

const FinalStep = (props: componentNameProps) => {
  const { route } = props;

  const { setLoggedIn } = useContext(AuthContext);

  const user = route.params.user;

  const [addUser, { data, loading }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      email: user.emailAddress,
      phone: user.phoneNumber,
      role: user.type,
      password: user.password,
      avatar: user.image,
      name: user.fullName,
    },
    onCompleted: (data) => {
      setToken(data?.signup?.token)
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: route.params.user.image }} style={styles.image} />
      </View>
      <View style={{ width: "80%" }}>
        <CustomButton title="SignUp" buttonFunction={() => addUser()} />
      </View>
    </View>
  );
};

export default FinalStep;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
