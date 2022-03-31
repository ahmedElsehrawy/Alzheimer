import * as React from "react";
import TakeImage from "../../components/TakeImage";

interface EventPictureScreenProps {
  navigation: any;
  route: any;
}

const EventPictureScreen = (props: EventPictureScreenProps) => {
  const { navigation, route } = props;
  return (
    <TakeImage navigation={navigation} route={route} distination="AddEvent" />
  );
};

export default EventPictureScreen;
