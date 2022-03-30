import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN = "AUTH_TOKEN";

let token;
let role;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  role = await AsyncStorage.getItem("Role");
  return { token, role };
};

export const setToken = (newToken, role) => {
  console.log("🚀 ~ file: index.js ~ line 19 ~ setToken ~ newToken", newToken);

  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken).then(() => {
    AsyncStorage.setItem("Role", role);
  });
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN).then(() =>
    AsyncStorage.removeItem("Role")
  );
};
