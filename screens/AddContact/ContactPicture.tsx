import React from "react";

import TakeImage from "../../components/TakeImage";

interface componentNameProps {
  navigation: any;
  route: any;
}

const ContactPictureScreen = (props: componentNameProps) => {
  const { navigation, route } = props;

  return (
    <TakeImage distination="AddContact" navigation={navigation} route={route} />
  );
};

export default ContactPictureScreen;
