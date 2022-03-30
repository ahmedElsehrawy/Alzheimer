import * as React from "react";
import { Image, View } from "react-native";
import Avatar from "../../components/Avatar";
import styles from "./styles";
import { ME } from "../WelcomeScreen";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import CustomText from "../../components/CustomText";
import fonts from "../../theme/fonts";

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
      <View style={styles.list}>
        <ListItem text={data?.me?.name} />
      </View>
    </View>
  );
};

export default Profile;
