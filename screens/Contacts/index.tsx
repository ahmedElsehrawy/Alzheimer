import * as React from "react";
import { View, FlatList } from "react-native";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/Button";
import fonts from "../../theme/fonts";
import styles from "./styles";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import colors from "../../theme/colors";

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
                buttonFunction={() => {}}
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
                buttonFunction={() => {}}
              />
            </View>
          )}
        </View>
      )}
    />
  );
};

export default Contacts;
