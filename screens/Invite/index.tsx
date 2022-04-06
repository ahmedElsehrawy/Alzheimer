import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import CustomButton from "../../components/Button";
import CustomTextInput from "../../components/CustomTextInput";
import Loader from "../../components/Loader";
import colors from "../../theme/colors";
import styles from "./styles";

const SEND_TO_BE_CARE_GIVER = gql`
  mutation SendRequestToBeCareGiver($email: String!) {
    sendRequestToBeCareGiver(email: $email) {
      id
      user {
        id
      }
    }
  }
`;

interface componentNameProps {}

const Invite = (props: componentNameProps) => {
  const [email, setEmail] = useState("");

  const [sendTobeCareGiver, { loading, data, error }] = useMutation(
    SEND_TO_BE_CARE_GIVER,
    {
      variables: {
        email: email,
      },
    }
  );

  if (loading) {
    return <Loader />;
  }

  useEffect(() => {
    if (data?.sendRequestToBeCareGiver?.id) {
      Alert.alert("Success", "request sent successfully");
    }

    if (error) {
      Alert.alert(
        "Ooops",
        "something went wrong please make sure you entered valid emailAddress"
      );
    }
  }, [data, error]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Email Address"
          value={email}
          style={{ width: "100%" }}
          onChangeText={(text: string) => setEmail(text)}
        />
        <CustomButton
          title="Invite"
          icon="person-add-outline"
          buttonFunction={() => sendTobeCareGiver()}
          styles={{ backgroundColor: colors.black2 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Invite;
