import * as React from "react";
import { View, FlatList, Image } from "react-native";
import CustomText from "../../components/CustomText";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import styles from "./styles";

interface componentNameProps {}

const updates = [
  {
    id: 1,
    imageUrl:
      "https://media.swncdn.com/cms/CW/family/Teens/58018-mom-and-teen-son-1200.1200w.tn.png",
    title: "Hi Mom!",
    sender: "Alice",
    senderRole: "Caregiver",
    date: new Date(),
  },
  {
    id: 2,
    imageUrl:
      "https://media.swncdn.com/cms/CW/family/Teens/58018-mom-and-teen-son-1200.1200w.tn.png",
    title: "Hi Mom!",
    sender: "Alice",
    senderRole: "Caregiver",
    date: new Date(),
  },
];

const Today = (props: componentNameProps) => {
  return (
    <FlatList
      data={updates}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <View style={styles.updateItem}>
          <Image
            source={{ uri: itemData.item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <CustomText styles={{ fontSize: fonts.large, fontWeight: "bold" }}>
              {itemData.item.title}
            </CustomText>
            <View style={styles.senderAndDate}>
              <CustomText styles={{ fontSize: fonts.small, fontWeight: "400" }}>
                {`From ${itemData.item.sender} (${itemData.item.senderRole})`}
              </CustomText>
              <CustomText styles={{ fontSize: 14, color: colors.date }}>
                {itemData.item.date.toLocaleTimeString()}
              </CustomText>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default Today;
