import React from "react";

import TakeImage from "../../components/TakeImage";

interface MedicinePictureScreenProps {
  navigation: any;
  route: any;
}

const MedicinePictureScreen = (props: MedicinePictureScreenProps) => {
  const { navigation, route } = props;

  return (
    <TakeImage distination="Medicine" navigation={navigation} route={route} />
  );
};

export default MedicinePictureScreen;
