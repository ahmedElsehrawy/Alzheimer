import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    fontSize: fonts.large,
    marginVertical: 20,
  },
  letsLogYouIn: {
    color: colors.black2,
    fontSize: fonts.large,
    fontWeight: "bold",
    marginVertical: 5,
  },
  forgetPassword: {
    backgroundColor: colors.white2,
  },
  forgetPasswordText: {
    color: colors.blue,
    fontSize: fonts.small,
  },
});
