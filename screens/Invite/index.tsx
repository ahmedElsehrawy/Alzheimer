import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import colors from "../../theme/colors";
import styles from "./styles";

interface componentNameProps {}

const Invite = (props: componentNameProps) => {
  const [addManually, setAddManually] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomButton
          title="Invite With Mail"
          icon="person-add-outline"
          buttonFunction={() => {}}
          styles={{ backgroundColor: colors.black2 }}
        />
        <CustomText styles={styles.text}>Or</CustomText>
        <CustomButton
          title="Add Manully"
          icon="add-circle-outline"
          buttonFunction={() => setAddManually(!addManually)}
          styles={{ backgroundColor: colors.black2 }}
        />
        {addManually && (
          <View style={styles.manuallyContainer}>
            <CustomTextInput
              placeholder="Email Address"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
            <CustomButton
              title="Invite"
              icon="add-circle-outline"
              buttonFunction={() => {}}
              styles={{ backgroundColor: colors.black2 }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Invite;
