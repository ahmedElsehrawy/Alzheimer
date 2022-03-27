import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getOptions = (name) => {
  return {
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={name} size={26} color={color} />
    ),
  };
};

export const MainStack = () => {
  const { setLoggedIn } = useContext(AuthContext);
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
            ...getOptions("home-outline"),
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
          options={getOptions("today-outline")}
        />
        <Stack.Screen
          name="Photos"
          component={Photos}
          options={getOptions("image-outline")}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={getOptions("call-outline")}
        />
        <Stack.Screen
          name="Me"
          component={Profile}
          options={getOptions("person-outline")}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
