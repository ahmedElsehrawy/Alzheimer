import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import CustomText from "../../components/CustomText";
import EmptyPage from "../../components/EmptyPage";
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

  const { data, loading, refetch } = useQuery(EVENTS_FOR_TODAY, {
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
  console.log("🚀 ~ file: index.tsx ~ line 48 ~ Today ~ data", data);

  useEffect(() => {
    var dt = new Date();

    let year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDate() + 1;

    let newDate = new Date(year, month, day, 0, 0, 0).toISOString();

    setMaxDate(newDate);
    console.log(
      "🚀 ~ file: index.tsx ~ line 59 ~ useEffect ~ newDate",
      newDate
    );
    setDate(new Date().toISOString());
  }, []);

  if (loading) {
    return <Loader />;
  }

  // if (data?.events?.count === 0) {
  //   return <EmptyPage text="No Events Today" />;
  // }

  return (
    <FlatList
      data={data?.events?.nodes}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refetch}
      refreshing={loading}
      ListEmptyComponent={<EmptyPage text="No Events Today" />}
      renderItem={(itemData) => (
        <View style={styles.updateItem}>
          {itemData.item.images.length > 0 && (
            <Image
              source={{ uri: itemData.item.images[0].replace("http", "https") }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={styles.content}>
            <CustomText styles={{ fontSize: fonts.medium, fontWeight: "bold" }}>
              {itemData.item.name}
            </CustomText>
            <View style={styles.senderAndDate}>
              <CustomText styles={{ fontSize: fonts.small, fontWeight: "400" }}>
                {`${itemData.item.description}`}
              </CustomText>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default Today;
