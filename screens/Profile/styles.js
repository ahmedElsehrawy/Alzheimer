import { StyleSheet, StatusBar } from "react-native";
import colors from "../../theme/colors";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
  },
  list: {
    width: "100%",
    marginTop: 40,
    borderWidth: 1,
    borderTopColor: colors.gray3,
  },
  listItem: {
    width: "100%",
    padding: 26,
  },
});
