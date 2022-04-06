import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
//@ts-ignore
import DateTimePicker from "@react-native-community/datetimepicker";
import Loader from "../../components/Loader";
import { CLOUDINARY_URL } from "../../constants";
import colors from "../../theme/colors";
import styles from "./style";
import { GET_MEDICINES } from "../Medicines";

const ADD_MEDICINE = gql`
  mutation AddEvent(
    $type: EventType!
    $days: [DAY!]
    $name: String
    $description: String
    $times: [DateTime!]
    $images: [String!]
  ) {
    addEvent(
      type: $type
      days: $days
      name: $name
      description: $description
      times: $times
      images: $images
    ) {
      id
      description
      name
      days
      times
      images
    }
  }
`;

const selectedStyle = {
  backgroundColor: colors.green,
};

interface AddMedicineProps {
  navigation: any;
  route: any;
}

const AddMedicine = (props: AddMedicineProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [images, setImages] = useState<any>([]);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [days, setDays] = useState<any>({
    SAT: false,
    SUN: false,
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
  });

  const [times, setTimes] = useState<any>([]);

  const [date, setDate] = useState(
    new Date() // to set default from props or current date
  );
  const [time, setTime] = useState(
    new Date() // to set default from props or current date
  );
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const [addEvent, { loading, data }] = useMutation(ADD_MEDICINE, {
    variables: {
      type: "MEDICINE",
      name: title,
      description: description,
      images: images,
    },
    refetchQueries: [
      {
        query: GET_MEDICINES,
        variables: {
          where: {
            type: {
              equals: "MEDICINE",
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

  const changeDayStatusHandler = (selectedDay: string) => {
    setDays({ ...days, [selectedDay]: !days[selectedDay] });
  };

  const onDateChange = (event: any, selectedValue: any) => {
    setShow(false);

    const selectedTime = selectedValue || new Date();

    setTime(selectedTime);
    setTimes([...times, selectedTime]);
    console.log(
      "🚀 ~ file: index.tsx ~ line 82 ~ onDateChange ~ selectedTime",
      selectedTime
    );
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("time");
  };

  useEffect(() => {
    console.log(days);
  }, [days]);

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
          <CustomText styles={styles.letsLogYouIn}>Add New Medicine</CustomText>
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

          <View>
            <CustomText children="select days" />
            <View style={styles.daysContainer}>
              <CustomButton
                styles={
                  days.SAT ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="S"
                buttonFunction={() => changeDayStatusHandler("SAT")}
              />
              <CustomButton
                styles={
                  days.SUN ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="S"
                buttonFunction={() => changeDayStatusHandler("SUN")}
              />
              <CustomButton
                styles={
                  days.MON ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="M"
                buttonFunction={() => changeDayStatusHandler("MON")}
              />
              <CustomButton
                styles={
                  days.TUE ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="T"
                buttonFunction={() => changeDayStatusHandler("TUE")}
              />
              <CustomButton
                styles={
                  days.WED ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="W"
                buttonFunction={() => changeDayStatusHandler("WED")}
              />
              <CustomButton
                styles={
                  days.THU ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="T"
                buttonFunction={() => changeDayStatusHandler("THU")}
              />
              <CustomButton
                styles={
                  days.FRI ? { ...styles.btn, ...selectedStyle } : styles.btn
                }
                textStyle={styles.btnText}
                title="F"
                buttonFunction={() => changeDayStatusHandler("FRI")}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <CustomTextInput
              editable={false}
              value={`${date.toLocaleDateString()} ${time.toLocaleTimeString()}`}
              style={{
                width: "70%",
                height: 60,
                borderRadius: 0,
              }}
            />
            <CustomButton
              icon="calendar-outline"
              styles={{
                width: "30%",
                height: 60,
                borderRadius: 0,
                backgroundColor: colors.darkGray,
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
          {times.map((time: Date) => (
            <View
              key={`${time} ${Math.random()}`}
              style={{ width: "100%", alignItems: "center" }}
            >
              <CustomText children={time.toLocaleTimeString()} />
            </View>
          ))}

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

export default AddMedicine;
