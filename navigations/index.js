import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FinalStep from "../screens/SignUpScreen/FinalStep";
import ProcceedScreen from "../screens/SignUpScreen/ProcceedScreen";
import UserNewProfilePictureScreen from "../screens/SignUpScreen/UserPicture";
import WelcomeScreen from "../screens/WelcomeScreen";
import Updates from "../screens/Updates";
import Today from "../screens/Today";
import Photos from "../screens/Photos";
import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import colors from "../theme/colors";
import { Text, TouchableWithoutFeedback } from "react-native";
import { AuthContext, signOut } from "../util";
import { useContext } from "react";
import fonts from "../theme/fonts";
import Invite from "../screens/Invite";
import NewUpdate from "../screens/NewUpdate";
import AddEvent from "../screens/AddEvent";
import Admin from "../screens/Admin";
import AddContact from "../screens/AddContact";
import AddContactImages from "../screens/AddContact/AddContactImages";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getOptions = (name, type) => {
  if (type === "ionicons") {
    return {
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={name} size={26} color={color} />
      ),
    };
  } else if (type === "entypo") {
    return {
      tabBarIcon: ({ color, size }) => (
        <Entypo name={name} size={26} color={color} />
      ),
    };
  } else if (type === "material") {
    return {
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name={name} size={26} color={color} />
      ),
    };
  }
};

export const MainStack = () => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.green,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Updates"
          component={Updates}
          options={{
            ...getOptions("home-outline", "ionicons"),
            headerLeft: (props) => {
              console.log("headerLeftProps", props);
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
                        console.log(err);
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
        <Stack.Screen
          name="Today"
          component={Today}
          options={getOptions("today-outline", "ionicons")}
        />
        <Stack.Screen
          name="Photos"
          component={Photos}
          options={getOptions("image-outline", "ionicons")}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={getOptions("call-outline", "ionicons")}
        />
        <Stack.Screen
          name="Me"
          component={Profile}
          options={getOptions("person-outline", "ionicons")}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const AdminStack = () => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.green,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Updates"
          component={Updates}
          options={{
            ...getOptions("home-outline", "ionicons"),
            headerLeft: (props) => {
              console.log("headerLeftProps", props);
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
                        console.log(err);
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
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={getOptions("person-add-outline", "ionicons")}
        />
        <Stack.Screen
          name="NewUpdate"
          component={NewUpdate}
          options={getOptions("add-circle-outline", "ionicons")}
        />
        <Stack.Screen
          name="AddEvent"
          component={AddEvent}
          options={getOptions("new-message", "entypo")}
        />
        <Stack.Screen
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

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Group>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Procceed"
            component={ProcceedScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProfilePic"
            component={UserNewProfilePictureScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FinalStep"
            component={FinalStep}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
