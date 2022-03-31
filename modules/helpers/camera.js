import * as ImagePicker from "expo-image-picker";

export const pickImage = async (navigation, route, distination) => {
  const data = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true,
  });
  console.log("🚀 ~ file: UserPicture.tsx ~ line 48 ~ pickImage ~ data", data);
  //@ts-ignore
  let base64Img = `data:image/jpg;base64,${data.base64}`;

  let newFile = {
    file: base64Img,
    upload_preset: "xrhxqiwj",
  };

  if (!data.cancelled) {
    if (distination === "AddContact") {
      navigation.navigate(distination, {
        imageFile: newFile,
      });
    } else {
      navigation.navigate(distination, {
        imageFile: newFile,
        user: route?.params?.user,
      });
    }
  }
};
