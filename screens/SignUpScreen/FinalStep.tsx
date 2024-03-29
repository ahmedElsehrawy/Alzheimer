import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { gql, useMutation } from "@apollo/client";
import CustomButton from "../../components/Button";
import Loader from "../../components/Loader";
import { setToken } from "../../modules/auth";
import { AuthContext } from "../../modules/store";
import { CLOUDINARY_URL, userTypes } from "../../constants";
import { ME } from "../WelcomeScreen";
import { GET_CONTACTS } from "../Contacts";
import { GET_MEDICINES } from "../Medicines";
import { GET_UPDATES } from "../Updates";

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
      user {
        role
      }
      token
    }
  }
`;

const FinalStep = (props: componentNameProps) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const { route } = props;

  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);

  const user = route.params.user;

  const [addUser, { data, loading: signUpLoading, error }] = useMutation(
    SIGN_UP_MUTATION,
    {
      variables: {
        email: user.emailAddress,
        phone: user.phoneNumber,
        role: user.type,
        password: user.password,
        avatar: image,
        name: user.fullName,
      },
      refetchQueries: [
        { query: ME },
        { query: GET_CONTACTS },
        { query: GET_MEDICINES },
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
        console.log("data", data);
        setToken(data?.signup?.token, data?.signup?.user?.role)
          .then(() => {
            if (data?.signup?.user?.role === userTypes.CARE_GIVER) {
              setIsAdmin(true);
              setLoggedIn(true);
              props.navigation.navigate("Updates");
            } else {
              setLoggedIn(true);
              props.navigation.navigate("/Updates");
            }
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: FinalStep.tsx ~ line 71 ~ FinalStep ~ err",
              err
            );
          });
      },
      onError: (error) => {
        console.log(
          "🚀 ~ file: FinalStep.tsx ~ line 99 ~ FinalStep ~ error",
          error
        );
        setLoggedIn(false);
      },
    }
  );

  const handleUploadImage = (image: object) => {
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(image),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: FinalStep.tsx ~ line 95 ~ .then ~ data", data);

        setImage(data.url);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: FinalStep.tsx ~ line 100 ~ handleUploadImage ~ err",
          err
        );
      });
  };

  useEffect(() => {
    handleUploadImage(route.params?.imageFile);
  }, [route.params.imageFile]);

  useEffect(() => {
    if (image !== "") {
      setLoading(false);
    }
  }, [image]);

  if (signUpLoading || loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={{ width: "80%" }}>
        <CustomButton title="SignUp" buttonFunction={addUser} />
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
