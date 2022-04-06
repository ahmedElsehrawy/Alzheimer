import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import CustomText from "../../components/CustomText";
import Loader from "../../components/Loader";
import fonts from "../../theme/fonts";
import styles from "./styles";

const EVENTS_FOR_TODAY = gql`
  query Events($where: EventWhereInput) {
    events(where: $where) {
      count
      nodes {
        id
        description
        name
        eventDate
        images
        patient {
          name
        }
      }
    }
  }
`;

interface componentNameProps {}

const Today = (props: componentNameProps) => {
  const [date, setDate] = useState<any>(null);
  const [maxDate, setMaxDate] = useState<any>(null);

  const { data, loading } = useQuery(EVENTS_FOR_TODAY, {
    variables: {
      where: {
        type: {
          equals: "EVENT",
        },
        eventDate: {
          gt: date,
          lt: maxDate,
        },
      },
    },
    skip: !date || !maxDate,
  });

  useEffect(() => {
    var dt = new Date();

    let year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDate() + 1;

    let newDate = new Date(year, month, day, 0, 0, 0).toISOString();

    setMaxDate(newDate);
    setDate(new Date().toISOString());
  }, []);

  console.log("events", data);

  if (loading) {
    return <Loader />;
  }

  return (
    <FlatList
      data={data?.events?.nodes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <View style={styles.updateItem}>
          {itemData.item.images.length > 0 && (
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
                {` ${itemData.item.description}`}
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

export default Today;
