import * as React from "react";
import { View, FlatList, Platform, Alert } from "react-native";
import { Linking } from "react-native";
import * as SMS from "expo-sms";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/Button";
import fonts from "../../theme/fonts";
import styles from "./styles";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import colors from "../../theme/colors";
import EmptyPage from "../../components/EmptyPage";

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
  navigation: any;
}

const Contacts = (props: AdminProps) => {
  const { data, loading } = useQuery(GET_CONTACTS);
  console.log("🚀 ~ file: index.tsx ~ line 38 ~ Contacts ~ data", data);

  const [deletContact, { loading: deleteLoading }] = useMutation(
    DELET_CONTACT,
    {
      refetchQueries: [{ query: GET_CONTACTS }],
      onCompleted: () => {
        Alert.alert("Success", "Contact Deleted");
      },
    }
  );

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
    return <EmptyPage text="No Contacts Yet" />;
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
                  backgroundColor: colors.blue2,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="pencil"
                title="Edit"
                buttonFunction={() => {
                  props?.navigation?.navigate("EditContact", {
                    itemData: itemData,
                  });
                }}
              />
              <CustomButton
                styles={{
                  margin: 10,
                  width: "40%",
                  maxWidth: 220,
                  height: 50,
                  backgroundColor: colors.darkViolet,
                }}
                textStyle={{
                  fontSize: fonts.medium,
                }}
                icon="trash-outline"
                title="Remove"
                buttonFunction={() =>
                  deletContact({
                    variables: {
                      where: {
                        id: itemData.item.id,
                      },
                    },
                  })
                }
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
                buttonFunction={() => {
                  if (itemData.item.phone) {
                    Linking.openURL(call(itemData.item.phone));
                  } else {
                    Alert.alert("Error", "sorry no phone attached");
                  }
                }}
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
                  if (itemData.item.phone) {
                    sendSMSMessage(itemData.item.phone).then((result) =>
                      console.log(result)
                    );
                  } else {
                    Alert.alert("Error", "sorry no phone attached");
                  }
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

const DELET_CONTACT = gql`
  mutation DeleteOneContact($where: ContactWhereUniqueInput!) {
    deleteOneContact(where: $where) {
      id
    }
  }
`;
