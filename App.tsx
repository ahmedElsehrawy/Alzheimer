import { useState } from "react";
import { MainStack, AuthStack } from "./navigations";
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
import { AuthProvider } from "./util";

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

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log("error")}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
        {loggedIn ? <MainStack /> : <AuthStack />}
      </AuthProvider>
    </ApolloProvider>
  );
}
