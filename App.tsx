import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./navigations";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}
