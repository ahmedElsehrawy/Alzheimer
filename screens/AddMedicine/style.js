import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.white,
  },
  goBack: {
    position: "absolute",
    top: 60,
    left: 20,
    fontSize: fonts.small,
    fontWeight: "500",
  },
  grayText: {
    color: colors.darkGray,
    fontSize: fonts.small,
    marginTop: 20,
  },
  letsLogYouIn: {
    color: colors.black2,
    fontSize: fonts.large,
    fontWeight: "bold",
    marginVertical: 5,
  },
  forgetPassword: {
    backgroundColor: colors.white,
    zIndex: 110,
  },
  forgetPasswordText: {
    color: colors.blue,
    fontSize: fonts.small,
  },
  typeSelectContainer: {
    width: "80%",
  },
  btnContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  daysContainer: {
    flexDirection: "row",
    width: "100%",
  },
  btn: {
    width: 35,
    height: 35,
    marginHorizontal: 3,
    backgroundColor: colors.date,
  },
  btnText: {
    fontSize: fonts.medium,
    marginHorizontal: 0,
  },
});
