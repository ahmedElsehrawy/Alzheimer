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
import MedicinePictureScreen from "../screens/AddMedicine/MedicinepictureScreem";
import Location from "../screens/Location";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const update_screen_options = {
  tabBarActiveTintColor: colors.blue2,
  headerTitleAlign: "center",
  tabBarItemStyle: {
    height: 70,
    paddingBottom: 10,
  },
  tabBarStyle: {
    alignItems: "flex-start",
    height: 65,
  },
};

export default AdminStack = () => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);

  const logout_button = () => {
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
              console.log("🚀 ~ file: adminNavigator.js ~ line 54 ~ err", err);
              setLoggedIn(true);
            });
        }}
      >
        <Text style={{ fontSize: fonts.small, fontWeight: "700" }}>Logout</Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={update_screen_options}>
        <Tab.Screen
          name="Updates"
          component={Updates}
          options={{
            ...getOptions("home", "ionicons"),
            headerLeftContainerStyle: {
              paddingHorizontal: 10,
            },
            headerLeft: logout_button,
          }}
        />
        <Tab.Screen
          name="Medicine"
          component={MedicineStack}
          options={{
            ...getOptions("healing", "material"),
            headerStyle: { borderBottomColor: colors.gray, borderWidth: 1 },
          }}
        />
        <Tab.Screen
          name="Update"
          component={UpdateStack}
          options={{
            ...getOptions("add-circle", "ionicons"),
            headerStyle: { borderBottomColor: colors.gray, borderWidth: 1 },
          }}
        />
        <Tab.Screen
          name="Event"
          component={EventStack}
          options={{
            ...getOptions("event", "material"),
            headerStyle: { borderBottomColor: colors.gray, borderWidth: 1 },
          }}
        />

        <Tab.Screen
          name="Profile"
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
        options={{
          ...getOptions("add-circle-outline", "ionicons"),
          headerShown: false,
          headerTitle: "Medicine",
        }}
      />
      <Stack.Screen
        name="UpdatePictureScreen"
        component={UpdatePictureScreen}
        options={{ headerShown: false }}
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
        options={{
          ...getOptions("new-message", "entypo"),
          headerShown: false,
          headerTitle: "Medicine",
        }}
      />
      <Stack.Screen
        name="EventPictureScreen"
        component={EventPictureScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MedicineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{
          ...getOptions("medical", "ionicons"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdatePictureScreen"
        component={MedicinePictureScreen}
        options={{ headerShown: false }}
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
          headerTitleAlign: "center",
          headerTitle: "Profile",
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
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerTitle: "Location" }}
      />
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{ headerTitle: "Invite" }}
      />
    </Stack.Navigator>
  );
};
