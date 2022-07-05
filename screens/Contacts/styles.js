import { StyleSheet } from "react-native";

import colors from "../../theme/colors";

export default styles = StyleSheet.create({
  item: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 320,
    paddingVertical: 10,
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 1,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  emptyContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
