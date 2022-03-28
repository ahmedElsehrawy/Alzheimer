import * as React from "react";
import { FlatList, TouchableHighlight } from "react-native";
import styles from "./styles";
import Avatar from "../../components/Avatar";
import { LinearGradient } from "expo-linear-gradient";
import { GET_CONTACTS } from "../Contacts";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";

const colors = [
  { from: "#000000", to: "#434343" },
  { from: "#485563", to: "#29323c" },
  { from: "#232526", to: "#414345" },
  { from: "#16222A", to: "#3A6073" },
  { from: "#403A3E", to: "#BE5869" },
];

let index = 0;

const createRandomColor = () => {
  // let randomIndex = Math.floor(Math.random() * 6);
  if (index === colors.length) {
    index = 0;
  }
  const gradiant = colors[index];
  index++;
  return gradiant;
};

const Photos = () => {
  const { data, loading } = useQuery(GET_CONTACTS);

  if (!data || loading) {
    return <Loader />;
  }
  return (
    <FlatList
      data={data?.contacts?.nodes}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      horizontal={false}
      renderItem={(itemData) => (
        <LinearGradient
          colors={[createRandomColor().from, createRandomColor().to]}
          style={styles.background}
        >
          <TouchableHighlight onPress={() => {}} style={styles.item}>
            <Avatar
              imageUrl={itemData.item.mainImage}
              name={itemData.item.name}
              identification={itemData.item.description}
              diameter={100}
              type="small"
              textColor="#fff"
            />
          </TouchableHighlight>
        </LinearGradient>
      )}
    />
  );
};

export default Photos;
