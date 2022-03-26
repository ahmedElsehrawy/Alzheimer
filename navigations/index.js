import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FinalStep from "../screens/SignUpScreen/FinalStep";
import ProcceedScreen from "../screens/SignUpScreen/ProcceedScreen";
import UserNewProfilePictureScreen from "../screens/SignUpScreen/UserPicture";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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
