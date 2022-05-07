import React, { useEffect, useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
//@ts-ignore
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import colors from "../../theme/colors";
import { gql, useMutation } from "@apollo/client";
import Loader from "../../components/Loader";
import { CLOUDINARY_URL } from "../../constants";

const ADD_EVENT = gql`
  mutation AddEvent(
    $type: EventType!
    $name: String
    $description: String
    $eventDate: DateTime
    $images: [String!]
  ) {
    addEvent(
      type: $type
      name: $name
      description: $description
      eventDate: $eventDate
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

const AddEvent = (props: componentNameProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [images, setImages] = useState<any>([]);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [date, setDate] = useState(
    new Date() // to set default from props or current date
  );
  const [time, setTime] = useState(
    new Date() // to set default from props or current date
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [addEvent, { loading, data }] = useMutation(ADD_EVENT, {
    variables: {
      type: "EVENT",
      name: title,
      description: description,
      eventDate: time,
      images: images,
    },
    onCompleted: () => {
      props.navigation.navigate("Me");
    },
  });

  const onDateChange = (event: any, selectedValue: any) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      console.log(
        "🚀 ~ file: index.tsx ~ line 73 ~ onDateChange ~ currentDate",
        currentDate
      );
      setMode("time");
      setShow(Platform.OS !== "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      console.log(
        "🚀 ~ file: index.tsx ~ line 82 ~ onDateChange ~ selectedTime",
        selectedTime
      );

      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

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
          <CustomText styles={styles.letsLogYouIn}>Add New Event</CustomText>
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
            <CustomTextInput
              editable={false}
              value={`${date.toLocaleDateString()} ${time.toLocaleTimeString()}`}
              style={{
                width: "70%",
                height: 47,
                backgroundColor: "#d1f778",
                borderColor: "transparent",
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <CustomButton
              icon="calendar-outline"
              styles={{
                width: "30%",
                height: 45,
                borderRadius: 0,
                backgroundColor: "#d1f778",
                borderColor: "transparent",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              buttonFunction={showDatePicker}
            />
            {show && (
              <DateTimePicker
                value={time}
                minimumDate={new Date()}
                display="default"
                //@ts-ignore
                mode={mode}
                onChange={onDateChange}
              />
            )}
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
                props.navigation.navigate("EventPictureScreen")
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

export default AddEvent;
