import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

export const getOptions = (name, type) => {
  if (type === "ionicons") {
    return {
      tabBarIcon: ({ color }) => (
        <Ionicons name={name} size={26} color={color} />
      ),
    };
  } else if (type === "entypo") {
    return {
      tabBarIcon: ({ color }) => <Entypo name={name} size={26} color={color} />,
    };
  } else if (type === "material") {
    return {
      tabBarIcon: ({ color }) => (
        <MaterialIcons name={name} size={26} color={color} />
      ),
    };
  }
};
