import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export default styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    fontSize: fonts.large,
    fontWeight: "bold",
  },
  manuallyContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: colors.black,
    borderWidth: 1,
    width: "100%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
});
