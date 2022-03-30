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
// import { gql, useMutation } from "@apollo/client";

import styles from "./styles";
import colors from "../../theme/colors";
import { CLOUDINARY_URL } from "../../constants";

// const ADD_UPDATE = gql`
//   mutation AddContact(
//     $images: [String!]!
//     $type: ContactType!
//     $mainImage: String
//     $description: String
//     $message: String
//     $name: String
//   ) {
//     addContact(
//       images: $images
//       type: $type
//       mainImage: $mainImage
//       description: $description
//       message: $message
//       name: $name
//     ) {
//       id
//     }
//   }
// `;

interface componentNameProps {
  navigation: any;
  route: any;
}

const NewUpdate = (props: componentNameProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  // const [addUpdate, { data, loading }] = useMutation(ADD_UPDATE, {
  //   variables: {
  //     images: images,
  //     type: type,
  //     name: name,
  //     message: `this is ${name} he is your ${type} he is ${description}`,
  //     description: description,
  //     mainImage: null,
  //   },
  // });

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

            <View style={styles.btnContainer}>
              <CustomButton
                title="ADD"
                styles={{
                  width: "100%",
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
