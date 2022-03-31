import React, { useState } from "react";
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import CustomButton from "../../components/Button";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
//@ts-ignore
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import colors from "../../theme/colors";

interface componentNameProps {
  navigation: any;
  route: any;
}

const AddEvent = (props: componentNameProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(
    new Date() // to set default from props or current date
  );
  const [time, setTime] = useState(
    new Date() // to set default from props or current date
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedValue: any) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 20 }}
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

            <CustomTextInput
              placeholder="note (optional)"
              value={note}
              onChangeText={(text: string) => setNote(text)}
            />
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
                  value={date}
                  minimumDate={new Date()}
                  display="default"
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
                buttonFunction={() => {}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddEvent;
