import React from "react";
import TakeImage from "../../components/TakeImage";

interface componentNameProps {
  navigation: any;
  route: any;
}

const UserNewProfilePictureScreen = (props: componentNameProps) => {
  const { navigation, route } = props;
  return (
    <TakeImage navigation={navigation} route={route} distination="FinalStep" />
  );
};

export default UserNewProfilePictureScreen;
