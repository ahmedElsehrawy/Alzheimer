import React from "react";

import TakeImage from "../../components/TakeImage";

interface componentNameProps {
  navigation: any;
  route: any;
}

const EditContactPictureScreen = (props: componentNameProps) => {
  const { navigation, route } = props;

  return (
    <TakeImage
      distination="EditContact"
      navigation={navigation}
      route={route}
    />
  );
};

export default EditContactPictureScreen;
