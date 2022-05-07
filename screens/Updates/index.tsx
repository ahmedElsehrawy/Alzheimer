import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image } from "react-native";
import CustomText from "../../components/CustomText";
import Loader from "../../components/Loader";
import fonts from "../../theme/fonts";
import styles from "./styles";

export const GET_UPDATES = gql`
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

interface componentNameProps {}

const Updates = (props: componentNameProps) => {
  const [transformedUpdated, setTransformedUpdates] = useState<any>([]);
  const { data, loading } = useQuery(GET_UPDATES, {
    variables: {
      where: {
        type: {
          equals: "UPDATE",
        },
      },
    },
  });

  useEffect(() => {
    if (data?.events?.nodes) {
      //@ts-ignore
      let newArray = data.events.nodes.map((node) => {
        return {
          ...node,
          //@ts-ignore
          images: node.images.map((image) => {
            return image.replace("http", "https");
          }),
        };
      });

      setTransformedUpdates(newArray);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }
  return (
    <FlatList
      data={transformedUpdated}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <View style={styles.updateItem}>
          {itemData.item.images.length >= 0 && (
            <Image
              source={{ uri: itemData.item.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={styles.content}>
            <CustomText styles={{ fontSize: fonts.large, fontWeight: "bold" }}>
              {itemData.item.name}
            </CustomText>
            <View style={styles.senderAndDate}>
              <CustomText styles={{ fontSize: fonts.small, fontWeight: "400" }}>
                {`From ${itemData.item.patient.name} (CARE GIVER)`}
              </CustomText>
              {/* <CustomText styles={{ fontSize: 14, color: colors.date }}>
                {itemData.item.date.toLocaleTimeString()}
              </CustomText> */}
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default Updates;
