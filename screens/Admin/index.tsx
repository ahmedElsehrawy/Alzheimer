import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../../components/Avatar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "../Profile/styles";
import { ME } from "../WelcomeScreen";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import colors from "../../theme/colors";
import CustomText from "../../components/CustomText";
import fonts from "../../theme/fonts";

interface ListItemProps {
  onPressFunction: any;
  text: string;
  iconName: any;
  iconLib: string;
}

const ListItem = (props: ListItemProps) => {
  return (
    <View style={{ ...styles.listItem, alignItems: "flex-start" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={props.onPressFunction}
      >
        {props.iconLib === "material" ? (
          <MaterialCommunityIcons
            name={props.iconName}
            size={24}
            color={colors.adminListTextColor}
          />
        ) : (
          <Ionicons
            name={props.iconName}
            size={24}
            color={colors.adminListTextColor}
          />
        )}
        <CustomText
          styles={{
            fontSize: fonts.medium,
            marginHorizontal: 10,
          }}
        >
          {props.text}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

interface AdminProps {
  navigation: any;
}

const Admin = (props: AdminProps) => {
  const { data, loading } = useQuery(ME);

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Avatar
        diameter={150}
        imageUrl={data?.me?.avatar}
        name={data?.me?.name}
        identification="Role (Admin)"
      />
      <View style={styles.list}>
        <ListItem
          onPressFunction={() => {}}
          text="Connected Patient"
          iconName="transit-connection-variant"
          iconLib="material"
        />
        <ListItem
          onPressFunction={() =>
            props.navigation.navigate("MyContacts", { admin: true })
          }
          text="Contacts"
          iconName="contacts"
          iconLib="material"
        />
        <ListItem
          onPressFunction={() => props.navigation.navigate("AddContact")}
          text="Add Contact"
          iconName="person-add-outline"
          iconLib="ionic"
        />
        <ListItem
          onPressFunction={() => {}}
          text="Account Settings"
          iconName="settings-outline"
          iconLib="ionic"
        />
      </View>
    </View>
  );
};

export default Admin;
