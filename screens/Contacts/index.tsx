import * as React from "react";
import { View, FlatList, Platform, Alert } from "react-native";
import { Linking } from "react-native";
import * as SMS from "expo-sms";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/Button";
import fonts from "../../theme/fonts";
import styles from "./styles";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import colors from "../../theme/colors";
import CustomText from "../../components/CustomText";

export const GET_CONTACTS = gql`
  query Contacts {
    contacts {
      count
      nodes {
        id
        description
        images
        mainImage
        message
        name
        type
        phone
      }
    }
  }
`;

interface AdminProps {
  route: any;
}

const Contacts = (props: AdminProps) => {
  const { data, loading } = useQuery(GET_CONTACTS);

  if (!data || loading) {
    return <Loader />;
  }

  const call = (phone: any) => {
    let phoneNumber;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    return phoneNumber;
  };

  const sendSMSMessage = async (phone: any) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      const { result } = await SMS.sendSMSAsync([phone], "");

      Promise.resolve(result);
    } else {
      Alert.alert("Error", "Something went wrong");
      Promise.resolve(new Error("Something went wrong sorry"));
    }
  };

  if (data.contacts.count === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <CustomText children="No Contacts Yet" />
      </View>
    );
  }

  return (
    <FlatList
      data={data?.contacts?.nodes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <View style={styles.item}>
          <Avatar
            imageUrl={itemData.item.mainImage}
            name={itemData.item.name}
            identification={itemData.item.description}
            diameter={130}
          />
          {props?.route?.params?.admin ? (
            <View style={styles.btnContainer}>
              <CustomButton
                styles={{
                  margin: 10,
                  width: "40%",
                  maxWidth: 220,
                  height: 50,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="pencil"
                title="Edit"
                buttonFunction={() => {}}
              />
              <CustomButton
                styles={{
                  margin: 10,
                  width: "40%",
                  maxWidth: 220,
                  height: 50,
                  backgroundColor: colors.red,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="trash-outline"
                title="Remove"
                buttonFunction={() => {}}
              />
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <CustomButton
                styles={{
                  margin: 10,
                  width: "30%",
                  maxWidth: 220,
                  height: 50,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="call-outline"
                title="Call"
                buttonFunction={() =>
                  Linking.openURL(call(itemData.item.phone))
                }
              />
              <CustomButton
                styles={{
                  margin: 10,
                  width: "30%",
                  maxWidth: 220,
                  height: 50,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="chatbubble-ellipses-outline"
                title="Text"
                buttonFunction={() => {
                  sendSMSMessage(itemData.item.phone).then((result) =>
                    console.log(result)
                  );
                }}
              />
            </View>
          )}
        </View>
      )}
    />
  );
};

export default Contacts;
