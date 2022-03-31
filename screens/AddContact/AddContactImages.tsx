import React, { useMemo } from "react";
import { Alert, View } from "react-native";

import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";

import { MediaType } from "expo-media-library";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";
import { CustomError } from "../../modules/helpers/error";

interface componentNameProps {
  navigation: any;
}

const AddContactImages = (props: componentNameProps) => {
  const onSuccess = (data: any) => {
    console.log(
      "🚀 ~ file: AddContactImages.tsx ~ line 17 ~ onSuccess ~ data",
      data
    );
    Alert.alert("Done", `${data.length} Images selected`);

    props.navigation.navigate("AddContact", {
      contactImages: data,
    });
  };

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 10,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: colors.green,
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "finish",
        back: "back",
        selected: "selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,

      onBack: () => props.navigation.goback(),
      onSuccess: (e: any) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBarPlaceHolder /> */}
          <View style={{ flex: 1 }}>
            <AssetsSelector
              Settings={widgetSettings}
              Errors={widgetErrors}
              Styles={widgetStyles}
              Navigator={widgetNavigator}

              // Resize={widgetResize} know how to use first , perform slower results.
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default AddContactImages;
