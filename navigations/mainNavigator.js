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

const Tab = createBottomTabNavigator();

export default MainStack = () => {
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
            headerLeft: (props) => {
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
                          "🚀 ~ file: mainNavigator.js ~ line 50 ~ err",
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
          name="Today"
          component={Today}
          options={getOptions("today-outline", "ionicons")}
        />
        <Tab.Screen
          name="Medicines"
          component={Medicines}
          options={getOptions("medical", "ionicons")}
        />
        <Tab.Screen
          name="Photos"
          component={Photos}
          options={getOptions("image-outline", "ionicons")}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={getOptions("call-outline", "ionicons")}
        />
        <Tab.Screen
          name="Me"
          component={Profile}
          options={getOptions("person-outline", "ionicons")}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
