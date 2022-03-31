import React from "react";

import TakeImage from "../../components/TakeImage";

interface UpdatePictureScreenProps {
  navigation: any;
  route: any;
}

const UpdatePictureScreen = (props: UpdatePictureScreenProps) => {
  const { navigation, route } = props;

  return (
    <TakeImage distination="NewUpdate" navigation={navigation} route={route} />
  );
};

export default UpdatePictureScreen;
