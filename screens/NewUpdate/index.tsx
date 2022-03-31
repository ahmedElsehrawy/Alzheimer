import React, { useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./styles";
import colors from "../../theme/colors";

interface componentNameProps {
  navigation: any;
  route: any;
}

const NewUpdate = (props: componentNameProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomText styles={styles.letsLogYouIn}>Add New Update</CustomText>
            <CustomTextInput
              placeholder="title"
              value={title}
              onChangeText={(text: string) => setTitle(text)}
            />
            <CustomTextInput
              placeholder="Description"
              value={description}
              onChangeText={(text: string) => setDescription(text)}
            />
            <CustomTextInput
              placeholder="note (optional)"
              value={note}
              onChangeText={(text: string) => setNote(text)}
            />

            <View style={styles.btnContainer}>
              <CustomButton
                icon="images-outline"
                styles={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: colors.black2,
                }}
                buttonFunction={() =>
                  props.navigation.navigate("UpdatePictureScreen")
                }
              />
              <CustomButton
                title="ADD"
                styles={{
                  width: "60%",
                  height: 70,
                  backgroundColor: colors.black2,
                }}
                buttonFunction={() => {}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewUpdate;
