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
import { gql, useMutation } from "@apollo/client";

import styles from "./styles";
import colors from "../../theme/colors";
import { CLOUDINARY_URL } from "../../constants";
import Loader from "../../components/Loader";
import { GET_CONTACTS } from "../Contacts";
import fonts from "../../theme/fonts";

const ADD_CONTACT = gql`
  mutation AddContact(
    $images: [String!]!
    $type: ContactType!
    $mainImage: String
    $description: String
    $message: String
    $name: String
    $phone: String
  ) {
    addContact(
      images: $images
      type: $type
      mainImage: $mainImage
      description: $description
      message: $message
      name: $name
      phone: $phone
    ) {
      id
    }
  }
`;

interface componentNameProps {
  navigation: any;
  route: any;
}

const AddContact = (props: componentNameProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [addContact, { loading: loadingData }] = useMutation(ADD_CONTACT, {
    variables: {
      images: [mainImage],
      type: type,
      name: name,
      message: `this is ${name} he is your ${type} he is ${description}`,
      description: description,
      mainImage: mainImage,
      phone: phoneNumber,
    },
    onCompleted: () => {
      props.navigation.navigate("MyContacts", {
        screen: "Contacts",
        params: { admin: true },
      });
    },
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const placeholder = {
    label: "Select Contact Type...",
    value: type,
    color: "#9EA0A4",
  };

  const handleUploadImage = (image: object) => {
    setLoading(true);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(image),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMainImage(data.url);
        addContact();
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: FinalStep.tsx ~ line 100 ~ handleUploadImage ~ err",
          err
        );
      });
  };

  if (loadingData || loading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomText styles={{ ...styles.letsLogYouIn }}>
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
            <CustomTextInput
              placeholder="Phone"
              value={phoneNumber}
              onChangeText={(text: string) => setPhoneNumber(text)}
            />
            <View style={styles.typeSelectContainer}>
              {
                //@ts-ignore
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
              }
            </View>

            <CustomButton
              icon="images-outline"
              title="select photo"
              iconSize={20}
              styles={{
                width: "80%",
                height: 45,
                borderRadius: 8,
                backgroundColor: colors.blue2,
              }}
              textStyle={{ fontSize: fonts.medium }}
              buttonFunction={() =>
                props.navigation.navigate("ContactPictureScreen")
              }
            />
            <CustomButton
              icon="add"
              title="add"
              iconSize={20}
              styles={{
                width: "80%",
                height: 45,
                borderRadius: 8,
                backgroundColor: colors.blue2,
              }}
              textStyle={{ fontSize: fonts.medium }}
              buttonFunction={() =>
                handleUploadImage(props.route?.params?.imageFile)
              }
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddContact;
