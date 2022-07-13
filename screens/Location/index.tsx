import { Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import styles from "../AddContact/styles";
import colors from "../../theme/colors";
import { gql, useQuery } from "@apollo/client";
import CustomTextInput from "../../components/CustomTextInput";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Props = {};

const GET_PATIENT_LOCATION = gql`
  query Query {
    patientLocation {
      latitude
      longitude
    }
  }
`;

const Location = (props: Props) => {
  const [fetchNow, setFetchNow] = useState(true);
  const { data, loading, refetch } = useQuery(GET_PATIENT_LOCATION, {
    skip: fetchNow,
  });
  const [longitude, setLongitude] = useState<any>(null);
  const [latitude, setLatitude] = useState<any>(null);

  const getLocation = () => {
    setFetchNow(false);
    refetch();
  };

  useEffect(() => {
    if (data) {
      setLongitude(+data?.patientLocation?.longitude);
      setLatitude(+data?.patientLocation?.latitude);
    }
  }, [data]);

  return (
    <View style={mapStyles.container}>
      <CustomButton
        title="Get Location"
        buttonFunction={getLocation}
        styles={{
          width: "80%",
          height: 45,
          borderRadius: 8,
          backgroundColor: colors.blue2,
        }}
      />
      {longitude && !fetchNow && (
        <View>
          <MapView
            style={mapStyles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="Title"
            description="title desc"
          >
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../assets/map_marker.png")}
              />
            </View>
          </Marker>
        </View>
      )}
    </View>
  );
};

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
});

export default Location;
