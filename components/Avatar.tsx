import * as React from "react";
import { Image, View, StyleSheet } from "react-native";
import fonts from "../theme/fonts";
import CustomText from "./CustomText";

interface componentNameProps {
  imageUrl: string;
  diameter: number;
  name?: string;
  identification?: string;
  type?: string;
  textColor?: string;
}

const Avatar = (props: componentNameProps) => {
  const { imageUrl, diameter, name, identification, type, textColor } = props;

  let editedImageUrl;

  if (!imageUrl) {
    editedImageUrl = null;
  } else {
    editedImageUrl = imageUrl.includes("https")
      ? imageUrl
      : imageUrl.replace("http", "https");
  }

  let commonProperties = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
  };

  let nameSize = fonts.large;
  let identificationSize = fonts.medium;

  if (type === "small") {
    nameSize = fonts.medium;
    identificationSize = fonts.small;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.imageContainer,
          ...commonProperties,
        }}
      >
        {editedImageUrl ? (
          <Image source={{ uri: editedImageUrl }} style={commonProperties} />
        ) : (
          <Image
            source={require("../assets/avatarreplace.png")}
            style={commonProperties}
          />
        )}
      </View>
      {name && (
        <CustomText
          styles={{
            ...styles.name,
            fontSize: nameSize,
            color: textColor || "#000",
          }}
        >
          {name}
        </CustomText>
      )}
      {identification && (
        <CustomText
          styles={{
            ...styles.identification,
            fontSize: identificationSize,
            color: textColor || "#000",
          }}
        >
          {identification}
        </CustomText>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  identification: {
    fontWeight: "500",
  },
});
