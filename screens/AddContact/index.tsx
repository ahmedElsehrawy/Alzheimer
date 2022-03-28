import React, { useEffect, useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import RNPickerSelect from "react-native-picker-select";

import styles from "./styles";
import colors from "../../theme/colors";

interface componentNameProps {
  navigation: any;
  route: any;
}

const AddContact = (props: componentNameProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [images, setImages] = useState([{}]);

  const placeholder = {
    label: "Select Contact Type...",
    value: type,
    color: "#9EA0A4",
  };

  useEffect(() => {
    if (props.route.params?.contactImages) {
      setImages([...props.route.params?.contactImages]);
    }
  }, [props.route]);

  useEffect(() => {
    console.log("imagesFromAdd", images);
  }, [images]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomText styles={styles.letsLogYouIn}>
              Add New Contact
            </CustomText>
            <CustomTextInput
              placeholder="Name"
              value={name}
              onChangeText={(text: string) => setName(text)}
            />
            <CustomTextInput
              placeholder="Description"
              value={description}
              onChangeText={(text: string) => setDescription(text)}
            />
            <View style={styles.typeSelectContainer}>
              <RNPickerSelect
                value={type}
                placeholder={placeholder}
                onValueChange={(value) => setType(value)}
                items={[
                  { label: "friend", value: "FRIEND" },
                  { label: "family", value: "FAMILY" },
                  { label: "neighbour", value: "NEIGHBOUR" },
                ]}
              />
            </View>

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
                  props.navigation.navigate("AddContactImages")
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

export default AddContact;