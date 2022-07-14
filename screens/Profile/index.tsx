import * as React from "react";
import { View } from "react-native";
import Avatar from "../../components/Avatar";
import styles from "./styles";
import { ME } from "../WelcomeScreen";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import CustomText from "../../components/CustomText";
import fonts from "../../theme/fonts";
import CustomButton from "../../components/Button";
import colors from "../../theme/colors";

interface ListItemProps {
  text: string;
}

const ListItem = (props: ListItemProps) => {
  return (
    <View style={styles.listItem}>
      <CustomText
        styles={{
          fontSize: fonts.medium,
          marginHorizontal: 10,
        }}
      >
        {`Your Name: ${props.text}`}
      </CustomText>
    </View>
  );
};

interface ProfileProps {
  navigation: any;
}

const Profile = (props: ProfileProps) => {
  const { data, loading: dataLoaing } = useQuery(ME);
  console.log("🚀 ~ file: index.tsx ~ line 36 ~ Profile ~ data", data);

  if (dataLoaing || !data) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Avatar diameter={150} imageUrl={data?.me?.avatar} />
      <ListItem text={data?.me?.name} />
      <View style={{ width: "100%", alignItems: "center" }}>
        <CustomButton
          title="Go To Requests"
          styles={{
            width: "80%",
            backgroundColor: colors.blue2,
            borderRadius: 8,
          }}
          textStyle={{ fontSize: fonts.medium }}
          buttonFunction={() => props.navigation.navigate("Requests")}
        />
        <CustomButton
          title="Go To Logout"
          styles={{
            width: "80%",
            backgroundColor: colors.blue2,
            borderRadius: 8,
          }}
          textStyle={{ fontSize: fonts.medium }}
          buttonFunction={() => props.navigation.navigate("LogoutScreen")}
        />
      </View>
    </View>
  );
};

export default Profile;
