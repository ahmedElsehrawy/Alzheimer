import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Updates from "../screens/Updates";
import Today from "../screens/Today";
import Photos from "../screens/Photos";
import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import colors from "../theme/colors";
import { Text, TouchableWithoutFeedback } from "react-native";
import { signOut } from "../modules/auth";
import { AuthContext } from "../modules/store";
import { useContext } from "react";
import fonts from "../theme/fonts";
import { getOptions } from "../modules/helpers";
import Medicines from "../screens/Medicines";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Requests from "../screens/Requests";
import LogoutScreen from "../screens/Logout";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default MainStack = () => {
  const { setLoggedIn, setIsAdmin } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
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
        }}
      >
        <Tab.Screen
          name="Updates"
          component={Updates}
          options={{
            ...getOptions("home", "ionicons"),
            headerLeftContainerStyle: {
              paddingHorizontal: 10,
            },
            //  headerLeft: () => {
            //   return (
            //     <TouchableWithoutFeedback
            //       style={{
            //         backgroundColor: "transparent",
            //       }}
            // onPress={() => {
            //   signOut()
            //     .then(() => {
            //       setLoggedIn(false);
            //       setIsAdmin(false);
            //     })
            //     .catch((err) => {
            //       console.log(
            //         "🚀 ~ file: mainNavigator.js ~ line 50 ~ err",
            //         err
            //       );

            //       setLoggedIn(true);
            //     });
            //       }}
            //     >
            //       <Text style={{ fontSize: fonts.small, fontWeight: "700" }}>
            //         Logout
            //       </Text>
            //     </TouchableWithoutFeedback>
            //   );
            // },
          }}
        />
        <Tab.Screen
          name="Today"
          component={Today}
          options={getOptions("today", "ionicons")}
        />
        <Tab.Screen
          name="Medicine"
          component={Medicines}
          options={getOptions("injection-syringe", "fontisto")}
        />
        {/* <Tab.Screen
          name="Photos"
          component={Photos}
          options={getOptions("image", "ionicons")}
        /> */}
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={getOptions("call", "ionicons")}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            ...getOptions("person", "ionicons"),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Me"
        component={Profile}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
    </Stack.Navigator>
  );
};
