import * as React from "react";
import { View, FlatList } from "react-native";
import Avatar from "../../components/Avatar";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import styles from "../Contacts/styles";
import EmptyPage from "../../components/EmptyPage";

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
  const { data, loading, refetch } = useQuery(GET_MEDICINES, {
    variables: {
      where: {
        type: {
          equals: "MEDICINE",
        },
      },
    },
  });
  console.log("🚀 ~ file: index.tsx ~ line 39 ~ Medicines ~ data", data);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <FlatList
      data={data?.events?.nodes}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<EmptyPage text="No Medicines Yet" />}
      onRefresh={refetch}
      refreshing={loading}
      renderItem={(itemData) => (
        <View style={styles.item}>
          <Avatar
            imageUrl={itemData.item.images[0]}
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
