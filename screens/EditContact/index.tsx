import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_CONTACTS } from "../Contacts";
import { CLOUDINARY_URL } from "../../constants";
import Loader from "../../components/Loader";
import styles from "../AddContact/styles";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/Button";
import RNPickerSelect from "react-native-picker-select";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

type Props = {
  navigation: any;
  route: any;
};

const UPDATA_CONTACT = gql`
  mutation Mutation(
    $updateContactId: Int!
    $images: [String!]!
    $type: ContactType!
    $name: String
    $description: String
    $phone: String
    $message: String
    $mainImage: String
  ) {
    updateContact(
      id: $updateContactId
      images: $images
      type: $type
      name: $name
      description: $description
      phone: $phone
      message: $message
      mainImage: $mainImage
    ) {
      id
    }
  }
`;

const EditContact = (props: Props) => {
  const [name, setName] = useState(props?.route?.params.itemData.item.name);
  const [description, setDescription] = useState(
    props?.route?.params.itemData.item.description
  );
  const [type, setType] = useState(props?.route?.params.itemData.item.type);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(
    props?.route?.params.itemData.item.mainImage
  );
  const [phoneNumber, setPhoneNumber] = useState(
    props?.route?.params.itemData.item.phone
  );

  const [addContact, { loading: loadingData }] = useMutation(UPDATA_CONTACT, {
    variables: {
      updateContactId: props?.route?.params.itemData.item.id,
      images: [mainImage],
      type: type,
      name: name,
      message: `this is ${name} he is your ${type} he is ${description}`,
      description: description,
      mainImage: mainImage,
      phone: phoneNumber,
    },

    refetchQueries: [{ query: GET_CONTACTS }],
    onCompleted: () => {
      Alert.alert("Success", "Contact Updated");
    },
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

  // useEffect(() => {
  //   if (props.route?.params?.imageFile) {
  //     handleUploadImage(props.route?.params?.imageFile);
  //   }
  // }, [props.route?.params?.imageFile]);

  if (loadingData || loading) {
    return <Loader />;
  }

  console.log("params", props?.route?.params.itemData.item);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
        >
          <View style={styles.container}>
            <CustomText styles={{ ...styles.letsLogYouIn }}>
              Update Contact
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
              title="update"
              iconSize={20}
              styles={{
                width: "80%",
                height: 45,
                borderRadius: 8,
                backgroundColor: colors.blue2,
              }}
              textStyle={{ fontSize: fonts.medium }}
              buttonFunction={() => {
                if (props?.route?.params.itemData.item) {
                  addContact();
                } else {
                  handleUploadImage(props.route?.params?.imageFile);
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditContact;
