import { StyleSheet, StatusBar } from "react-native";
import colors from "../../theme/colors";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: StatusBar.currentHeight + 50,
  },
  list: {
    width: "100%",
    marginTop: 26,
  },
  listItem: {
    width: "100%",
    padding: 26,
    borderWidth: 1,
    borderTopColor: colors.gray3,
    borderBottomColor: colors.gray3,
  },
});
