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
import ContactPictureScreen from "../screens/AddContact/ContactPicture";
import Contacts from "../screens/Contacts";
import UpdatePictureScreen from "../screens/NewUpdate/UpdatePictureScreen";
import EventPictureScreen from "../screens/AddEvent/EventPictureScreen";
import AddMedicine from "../screens/AddMedicine";

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
          tabBarItemStyle: {
            height: 80,
            paddingBottom: 20,
          },
          tabBarStyle: {
            alignItems: "flex-start",
            height: 80,
          },
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
          name="Medicine"
          component={AddMedicine}
          options={getOptions("medical", "ionicons")}
        />
        <Tab.Screen
          name="New Update"
          component={UpdateStack}
          options={{
            ...getOptions("add-circle-outline", "ionicons"),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Event"
          component={EventStack}
          options={{
            ...getOptions("new-message", "entypo"),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Me"
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

const UpdateStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewUpdate"
        component={NewUpdate}
        options={getOptions("add-circle-outline", "ionicons")}
      />
      <Stack.Screen
        name="UpdatePictureScreen"
        component={UpdatePictureScreen}
        options={{ headerTitle: "Choose an Image" }}
      />
    </Stack.Navigator>
  );
};

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={getOptions("new-message", "entypo")}
      />
      <Stack.Screen
        name="EventPictureScreen"
        component={EventPictureScreen}
        options={{ headerTitle: "Choose an Image" }}
      />
    </Stack.Navigator>
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
      <Stack.Screen
        name="ContactPictureScreen"
        component={ContactPictureScreen}
        options={{ headerTitle: "Choose Contact Image" }}
      />
      <Stack.Screen
        name="MyContacts"
        component={Contacts}
        options={{ headerTitle: "My Contacts" }}
      />
    </Stack.Navigator>
  );
};
