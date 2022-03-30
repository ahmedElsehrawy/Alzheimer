import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

interface componentNameProps {
  navigation: any;
  route: any;
}

const UserNewProfilePictureScreen = (props: componentNameProps) => {
  const { navigation, route } = props;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<any>(null);

  const takeImageHandler = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      let newFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[0]}`,
      };
      navigation.navigate("FinalStep", {
        user: route.params.user,
        imageFile: newFile,
      });
    }
  };

  const pickImage = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    let newFile = {
      //@ts-ignore
      uri: data.uri,
      //@ts-ignore

      type: `test/${data.uri.split(".")[1]}`,
      //@ts-ignore

      name: `test.${data.uri.split(".")[0]}`,
    };

    if (!data.cancelled) {
      navigation.navigate("FinalStep", {
        user: route.params.user,
        imageFile: newFile,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio={"1:1"}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <MaterialIcons name="flip-camera-android" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.buttonContainer, justifyContent: "center" }}>
          <TouchableOpacity style={styles.bigButton} onPress={takeImageHandler}>
            <MaterialIcons name="camera" size={60} color="#fff" />
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{ justifyContent: "flex-start" }}>
        <TouchableOpacity style={styles.bigButton} onPress={pickImage}>
          <AntDesign name="picture" size={80} color="#515BD4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserNewProfilePictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "70%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(0,0,0,0.4)",
    margin: 15,
  },
  bigButton: {
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(0,0,0,0.4)",
    marginVertical: 15,
  },
  image: {
    width: "100%",
    height: "50%",
  },
  previewImage: {
    width: "100%",
    height: "80%",
  },
  textInput: {
    padding: 20,
  },
  addBtn: {
    backgroundColor: "rgba(129,52,175,1)",
    width: "90%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    marginTop: 15,
  },
  addText: {
    color: "white",
  },
});
