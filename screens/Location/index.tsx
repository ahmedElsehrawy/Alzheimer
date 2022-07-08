import { View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import styles from "../AddContact/styles";
import colors from "../../theme/colors";
import { gql, useQuery } from "@apollo/client";
import CustomTextInput from "../../components/CustomTextInput";

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
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");

  const getLocation = () => {
    setFetchNow(false);
    refetch();
  };

  useEffect(() => {
    if (data) {
      setLongitude(`longitude: ${data?.patientLocation?.longitude.toString()}`);
      setLatitude(`latitude: ${data?.patientLocation?.latitude.toString()}`);
    }
  }, [data]);

  return (
    <View style={styles.container}>
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
      <CustomTextInput value={latitude} placeholder="latitude" />
      <CustomTextInput value={longitude} placeholder="longitude" />
    </View>
  );
};

export default Location;
