import { useEffect, useState } from "react";
import { MainStack, AuthStack, AdminStack } from "./navigations";
//@ts-ignore
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { ApolloURI } from "./constants";
import { AuthProvider } from "./modules/store";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";

const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

const client = new ApolloClient({
  link: new HttpLink({ uri: ApolloURI }),
  cache: new InMemoryCache(),
});

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // const triggerNotificationHandler = () => {
  //   Notifications.scheduleNotificationAsync({

  //   })
  // };

  useEffect(() => {
    console.log("nooooo");
  }, []);

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

  return (
    <ApolloProvider client={client}>
      <AuthProvider
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      >
        {!loggedIn ? <AuthStack /> : isAdmin ? <AdminStack /> : <MainStack />}
        {/* <View style={{ padding: 50 }}>
          <Button onPress={() => {}} title="trigger" />
        </View> */}
      </AuthProvider>
    </ApolloProvider>
  );
}
