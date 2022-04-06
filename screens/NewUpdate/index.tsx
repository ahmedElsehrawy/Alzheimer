import React, { useEffect, useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./styles";
import colors from "../../theme/colors";
import { gql, useMutation } from "@apollo/client";
import Loader from "../../components/Loader";
import { CLOUDINARY_URL } from "../../constants";
import { GET_UPDATES } from "../Updates";

const ADD_EVENT = gql`
  mutation AddEvent(
    $type: EventType!
    $name: String
    $description: String
    $images: [String!]
  ) {
    addEvent(
      type: $type
      name: $name
      description: $description
      images: $images
    ) {
      id
      description
      name
    }
  }
`;

interface componentNameProps {
  navigation: any;
  route: any;
}

const NewUpdate = (props: componentNameProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [images, setImages] = useState<any>([]);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const [addEvent, { loading, data }] = useMutation(ADD_EVENT, {
    variables: {
      type: "UPDATE",
      name: title,
      description: description,
      images: images,
    },
    refetchQueries: [
      {
        query: GET_UPDATES,
        variables: {
          where: {
            type: {
              equals: "UPDATE",
            },
          },
        },
      },
    ],
    onCompleted: () => {
      props.navigation.navigate("Me");
    },
  });

  const handleUploadImage = (image: object) => {
    setUploadImageLoading(true);
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

        setImages([...images, data.url]);
        setUploadImageLoading(false);
        addEvent();
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: FinalStep.tsx ~ line 100 ~ handleUploadImage ~ err",
          err
        );
      });
  };

  const AddEventProcess = () => {
    if (!image || !title || !description) {
      Alert.alert("Ooops", "please add All fields");
    } else {
      handleUploadImage(image);
    }
  };

  useEffect(() => {
    if (props.route?.params?.imageFile) {
      setImage(props.route.params.imageFile);
    }
  }, [props.route?.params?.imageFile]);

  if (loading || uploadImageLoading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={{
          width: "100%",
          paddingVertical: 20,
          backgroundColor: colors.white,
        }}
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
              buttonFunction={AddEventProcess}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default NewUpdate;
