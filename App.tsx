import { useContext, useEffect, useState } from "react";
import { MainStack, AuthStack, AdminStack } from "./navigations";
//@ts-ignore
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useMutation,
  gql,
  useQuery,
} from "@apollo/client";
import { ApolloURI } from "./constants";
import { AuthContext } from "./modules/store";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import useLocation from "./modules/useLocation";
import { ME } from "./screens/WelcomeScreen";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};
export async function registerForPushNotificationsAsync() {
  const expoPushToken = await Notifications.getExpoPushTokenAsync({});
  console.log(
    "🚀 ~ file: App.tsx ~ line 34 ~ registerForPushNotificationsAsync ~ expoPushToken",
    expoPushToken.data
  );
  try {
    await client.mutate({
      mutation: gql`
  mutation updateMyProfile {
    updateMyProfile(notificationToken:"${expoPushToken.data}"){
      id
    }
  }
  `,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: App.tsx ~ line 47 ~ registerForPushNotificationsAsync ~ error",
      error
    );
    Alert.alert(error?.message);
  }
}

export const client = new ApolloClient({
  link: new HttpLink({ uri: ApolloURI }),
  cache: new InMemoryCache(),
});

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const { loggedIn: loggedInContext, isAdmin: isAdminContext } =
    useContext(AuthContext);

  const [updatePatientLocation, { loading, data }] = useMutation(
    UPDATE_PATIENT_LOCATION
  );
  const { data: meData } = useQuery(ME);

  const MINUTE_MS = 10000;

  let newLocation = useLocation();
  const _handleNotification = (notification) => {
    console.log(
      "🚀 ~ file: App.tsx ~ line 75 ~ App ~ notification",
      notification
    );
    notification?.request?.content?.title &&
      Alert.alert(
        notification.request.content.title,
        notification.request.content.body
      );
  };

  const _handleNotificationResponse = (response) => {
    console.log("🚀 ~ file: App.tsx ~ line 89 ~ App ~ response", response);
  };
  useEffect(() => {
    console.log(
      "🚀 ~ file: App.tsx ~ line 73 ~ useEffect ~ meData?.me?",
      meData?.me
    );

    meData?.me?.id && registerForPushNotificationsAsync();
  }, [meData]);
  useEffect(() => {
    Notifications.addNotificationReceivedListener(_handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(newLocation);

      if (loggedInContext) {
        if (!isAdminContext) {
          let latitude = newLocation.coords.latitude.toString();
          let longitude = newLocation.coords.longitude.toString();
          updatePatientLocation({
            variables: {
              latitude,
              longitude,
            },
          });
        }
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [newLocation, loggedInContext, isAdminContext]);

  // const triggerNotificationHandler = () => {
  //   Notifications.scheduleNotificationAsync({
  //   })
  // };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => {
          console.log("🚀 ~ file: App.tsx ~ line 41 ~ App ~ err", err);
        }}
      />
    );
  }

  return !loggedInContext ? (
    <AuthStack />
  ) : isAdminContext ? (
    <AdminStack />
  ) : (
    <MainStack />
  );
}

const UPDATE_PATIENT_LOCATION = gql`
  mutation UpdatePatientLocation($latitude: String, $longitude: String) {
    updatePatientLocation(latitude: $latitude, longitude: $longitude) {
      distance
      latitude
      longitude
    }
  }
`;
