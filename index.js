import { registerRootComponent } from "expo";
import { useState } from "react";

import App from "./App";
import { client } from "./App";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./modules/store";

const Wrapper = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Wrapper);
