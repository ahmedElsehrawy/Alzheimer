import { StyleSheet, StatusBar } from "react-native";

export default styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
  },
  list: {
    width: "100%",
    marginTop: 40,
  },
  listItem: {
    width: "100%",
    padding: 26,
    alignItems: "center",
  },
});
