import * as React from "react";
import { View, FlatList } from "react-native";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/Button";
import fonts from "../../theme/fonts";
import styles from "./styles";

const image1 =
  "https://www.annaharar.com/ContentFiles/92535Image1-1180x677_d.jpg?version=1992496";

const image2 =
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
const image3 =
  "https://images.unsplash.com/photo-1525181737312-adca155347de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80";
const image4 =
  "https://upload.wikimedia.org/wikipedia/commons/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg";
const image5 =
  "https://cdn.vox-cdn.com/thumbor/VR9WV6NVnDxTFAEMju2pPZLFSlc=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8853909/cersei_lannister.jpg";
const image6 =
  "https://static.wikia.nocookie.net/gameofthrones/images/1/1c/Daenerys_and_dragon.jpg/revision/latest/scale-to-width-down/2560?cb=20160718051855";

export const contacts = [
  {
    id: 1,
    imageUrl: image1,
    name: "Hoda Elmofty",
    identification: "Caregiver",
  },
  {
    id: 2,
    imageUrl: image2,
    name: "Alexa",
    identification: "Daughter",
  },
  {
    id: 3,
    imageUrl: image3,
    name: "Salma",
    identification: "Friend",
  },
  {
    id: 4,
    imageUrl: image4,
    name: "Kitty",
    identification: "Little daughter",
  },
  {
    id: 5,
    imageUrl: image5,
    name: "Sersi Lanister",
    identification: "Queen",
  },
  {
    id: 6,
    imageUrl: image6,
    name: "Daenerys",
    identification: "Mother of Dragons",
  },
];

const Contacts = () => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <View style={styles.item}>
          <Avatar
            imageUrl={itemData.item.imageUrl}
            name={itemData.item.name}
            identification={itemData.item.identification}
            diameter={130}
          />
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
        </View>
      )}
    />
  );
};

export default Contacts;
