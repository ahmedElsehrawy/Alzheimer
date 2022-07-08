import { useContext, useEffect, useState } from "react";
import { MainStack, AuthStack, AdminStack } from "./navigations";
//@ts-ignore
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  useMutation,
  gql,
} from "@apollo/client";
import { ApolloURI } from "./constants";
import { AuthProvider, AuthContext } from "./modules/store";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";
import useLocation from "./modules/useLocation";
import { signOut } from "./modules/auth/index";

const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

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

  const MINUTE_MS = 10000;

  let newLocation = useLocation();

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
