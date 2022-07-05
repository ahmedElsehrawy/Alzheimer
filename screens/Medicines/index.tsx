import * as React from "react";
import { View, FlatList } from "react-native";
import Avatar from "../../components/Avatar";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import styles from "../Contacts/styles";
import CustomText from "../../components/CustomText";

export const GET_MEDICINES = gql`
  query Events($where: EventWhereInput) {
    events(where: $where) {
      count
      nodes {
        id
        description
        name
        images
        patient {
          name
        }
      }
    }
  }
`;

interface MedicinesProps {}

const Medicines = (props: MedicinesProps) => {
  const { data, loading } = useQuery(GET_MEDICINES, {
    variables: {
      where: {
        type: {
          equals: "MEDICINE",
        },
      },
    },
  });

  if (!data || loading) {
    return <Loader />;
  }

  if (data?.events.count === 0) {
    return (
      <View style={styles.emptyContainer}>
        <CustomText>No Medicines</CustomText>
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
        </View>
      )}
    />
  );
};

export default Medicines;
