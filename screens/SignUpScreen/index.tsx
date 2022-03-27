import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import Header from "../../components/Header";
import colors from "../../theme/colors";
import styles from "./styles";
import { userTypes } from "../../constants";

interface componentNameProps {
  navigation: any;
}

const SignUpScreen = (props: componentNameProps) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <View style={styles.container}>
          <CustomText styles={styles.grayText}>Hello</CustomText>
          <CustomText styles={styles.letsLogYouIn}>
            Tell Us Who You Are
          </CustomText>

          <CustomButton
            title="I'm a patient"
            styles={{ width: "80%", backgroundColor: colors.purple }}
            buttonFunction={() =>
              props.navigation.navigate("Procceed", { type: userTypes.PATIENT })
            }
          />
          <CustomButton
            title="I'm a caregiver"
            styles={{ width: "80%", backgroundColor: colors.green }}
            buttonFunction={() =>
              props.navigation.navigate("Procceed", {
                type: userTypes.CARE_GIVER,
              })
            }
          />
          <CustomButton
            title="I'm a family/friend"
            styles={{ width: "80%", backgroundColor: colors.orange }}
            buttonFunction={() =>
              props.navigation.navigate("Procceed", {
                type: userTypes.RELATIVE,
              })
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
