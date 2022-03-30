import * as React from "react";
import { View, FlatList } from "react-native";
import Avatar from "../../components/Avatar";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import styles from "../Contacts/styles";

export const GET_MEDICINES = gql`
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

interface MedicinesProps {}

const Medicines = (props: MedicinesProps) => {
  const { data, loading } = useQuery(GET_MEDICINES);

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
        </View>
      )}
    />
  );
};

export default Medicines;
