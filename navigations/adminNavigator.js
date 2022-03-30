import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Invite from "../screens/Invite";
import NewUpdate from "../screens/NewUpdate";
import AddEvent from "../screens/AddEvent";
import { getOptions } from "../modules/helpers";
import colors from "../theme/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../modules/store";
import AddContact from "../screens/AddContact";
import AddContactImages from "../screens/AddContact/AddContactImages";
import Updates from "../screens/Updates";
import Admin from "../screens/Admin";
import { Text, TouchableWithoutFeedback } from "react-native";
import fonts from "../theme/fonts";
import { signOut } from "../modules/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default AdminStack = () => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.green,
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Updates"
          component={Updates}
          options={{
            ...getOptions("home-outline", "ionicons"),
            headerLeftContainerStyle: {
              paddingHorizontal: 10,
            },
            headerLeft: () => {
              return (
                <TouchableWithoutFeedback
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onPress={() => {
                    signOut()
                      .then(() => {
                        setLoggedIn(false);
                        setIsAdmin(false);
                      })
                      .catch((err) => {
                        console.log(
                          "🚀 ~ file: adminNavigator.js ~ line 54 ~ err",
                          err
                        );
                        setLoggedIn(true);
                      });
                  }}
                >
                  <Text style={{ fontSize: fonts.small, fontWeight: "700" }}>
                    Logout
                  </Text>
                </TouchableWithoutFeedback>
              );
            },
          }}
        />
        <Tab.Screen
          name="Invite"
          component={Invite}
          options={getOptions("person-add-outline", "ionicons")}
        />
        <Tab.Screen
          name="NewUpdate"
          component={NewUpdate}
          options={getOptions("add-circle-outline", "ionicons")}
        />
        <Tab.Screen
          name="AddEvent"
          component={AddEvent}
          options={getOptions("new-message", "entypo")}
        />
        <Tab.Screen
          name="AdminStack"
          component={SettingStack}
          options={{
            ...getOptions("admin-panel-settings", "material"),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          ...getOptions("admin-panel-settings", "material"),
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen
        name="AddContactImages"
        component={AddContactImages}
        options={{ headerTitle: "Choose Some Images" }}
      />
    </Stack.Navigator>
  );
};
