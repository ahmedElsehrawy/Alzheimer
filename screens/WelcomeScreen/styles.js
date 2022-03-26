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
  textLine: {
    color: colors.black,
    fontSize: fonts.medium,
    fontWeight: "600",
    marginVertical: 15,
  },
  buttonContainer: {
    width: "80%",
  },
});
