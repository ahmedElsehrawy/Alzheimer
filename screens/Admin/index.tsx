import * as React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
          //@ts-ignore
          <MaterialCommunityIcons
            name={props.iconName}
            size={24}
            color={colors.black2}
          />
        ) : (
          //@ts-ignore
          <Ionicons name={props.iconName} size={24} color={colors.black2} />
        )}
        <CustomText
          styles={{
            fontSize: fonts.medium,
            marginHorizontal: 10,
            color: colors.black2,
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
    <ScrollView>
      <View style={styles.container}>
        <Avatar
          diameter={150}
          imageUrl={data?.me?.avatar}
          name={data?.me?.name}
        />
        <View style={styles.list}>
          <ListItem
            onPressFunction={() =>
              props.navigation.navigate("MyContacts", {
                screen: "Contacts",
                params: { admin: true },
              })
            }
            text="Contacts"
            iconName="contacts"
            iconLib="material"
          />
          <ListItem
            onPressFunction={() => props.navigation.navigate("AddContact")}
            text="Add Contact"
            iconName="person-add"
            iconLib="ionic"
          />
          {/* <ListItem
            onPressFunction={() => {}}
            text="Account Settings"
            iconName="settings"
            iconLib="ionic"
          /> */}
          <ListItem
            onPressFunction={() => props.navigation.navigate("Location")}
            text="Patient Location"
            iconName="location"
            iconLib="ionic"
          />
          <ListItem
            onPressFunction={() => props.navigation.navigate("Invite")}
            text="Invite"
            iconName="person-add"
            iconLib="ionic"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Admin;
