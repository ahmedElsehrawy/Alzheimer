import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  requests: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  acceptBtnStyle: {
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    elevation: 0,
  },
});
