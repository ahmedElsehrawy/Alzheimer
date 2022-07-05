import React from "react";
import { View } from "react-native";
import CustomButton from "./Button";
import styles from "../screens/AddMedicine/style";
import colors from "../theme/colors";

const selectedStyle = {
  backgroundColor: colors.blue2,
};

const notSelectedStyle = {
  backgroundColor: colors.lightBlue,
};

type SelectDayProps = {
  days: any;
  setDays: any;
};

const SelectDay = (props: SelectDayProps) => {
  const { days, setDays } = props;
  const changeDayStatusHandler = (selectedDay: string) => {
    setDays({ ...days, [selectedDay]: !days[selectedDay] });
  };

  return (
    <View>
      <View style={styles.daysContainer}>
        <CustomButton
          styles={
            days.SAT
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="S"
          buttonFunction={() => changeDayStatusHandler("SAT")}
        />
        <CustomButton
          styles={
            days.SUN
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="S"
          buttonFunction={() => changeDayStatusHandler("SUN")}
        />
        <CustomButton
          styles={
            days.MON
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="M"
          buttonFunction={() => changeDayStatusHandler("MON")}
        />
        <CustomButton
          styles={
            days.TUE
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="T"
          buttonFunction={() => changeDayStatusHandler("TUE")}
        />
        <CustomButton
          styles={
            days.WED
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="W"
          buttonFunction={() => changeDayStatusHandler("WED")}
        />
        <CustomButton
          styles={
            days.THU
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="T"
          buttonFunction={() => changeDayStatusHandler("THU")}
        />
        <CustomButton
          styles={
            days.FRI
              ? { ...styles.btn, ...selectedStyle }
              : { ...styles.btn, ...notSelectedStyle }
          }
          textStyle={styles.btnText}
          title="F"
          buttonFunction={() => changeDayStatusHandler("FRI")}
        />
      </View>
    </View>
  );
};

export default SelectDay;
