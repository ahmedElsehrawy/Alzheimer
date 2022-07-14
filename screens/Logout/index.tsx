import { View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/Button";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { signOut } from "../../modules/auth";
import { AuthContext } from "../../modules/store";
import { useQuery } from "@apollo/client";
import { ME } from "../WelcomeScreen";

type Props = {};

const LogoutScreen = (props: Props) => {
  const [name, setName] = useState<string>("");

  const { data, loading } = useQuery(ME);

  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomTextInput
        placeholder="enter your username to logout"
        onChangeText={(text: string) => {
          setName(text);
        }}
        value={name}
      />
      <CustomButton
        title="Logout"
        styles={{
          width: "80%",
          backgroundColor: colors.blue2,
          borderRadius: 8,
        }}
        textStyle={{ fontSize: fonts.medium }}
        buttonFunction={() => {
          if (name === data?.me?.name) {
            signOut()
              .then(() => {
                setLoggedIn(false);
                setIsAdmin(false);
              })
              .catch((err) => {
                console.log("🚀 ~ file: mainNavigator.js ~ line 50 ~ err", err);

                setLoggedIn(true);
              });
          } else {
            Alert.alert("Sorry", "username doesn't match");
          }
        }}
      />
    </View>
  );
};

export default LogoutScreen;
