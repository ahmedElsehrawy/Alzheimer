import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Avatar from "../../components/Avatar";
import styles from "./style";
import { gql, useMutation, useQuery } from "@apollo/client";
import CustomText from "../../components/CustomText";
import Loader from "../../components/Loader";
import CustomButton from "../../components/Button";
import colors from "../../theme/colors";
import EmptyPage from "../../components/EmptyPage";

const REQUESTS = gql`
  query Requests($where: RequestWhereInput) {
    requests(where: $where) {
      count
      nodes {
        id
        user {
          id
          email
          name
          avatar
        }
      }
    }
  }
`;

const ACCEPT_REQUEST = gql`
  mutation AcceptRequest($acceptRequestId: Int!) {
    acceptRequest(id: $acceptRequestId) {
      id
      user {
        email
        id
      }
    }
  }
`;

const REFUSE_REQUEST = gql`
  mutation RefuseRequest($refuseRequestId: Int!) {
    refuseRequest(id: $refuseRequestId) {
      id
      user {
        id
        email
      }
    }
  }
`;

interface RequestsProps {}

const Requests = (props: RequestsProps) => {
  const [requests, setRequests] = useState<any>([]);
  const {
    data: requestsData,
    loading: requestsLoading,
    refetch,
  } = useQuery(REQUESTS, {
    variables: {
      where: {
        status: {
          equals: "PENDING",
        },
      },
    },
  });

  const [acceptRequest, { loading: acceptRequestLoading }] = useMutation(
    ACCEPT_REQUEST,
    {
      refetchQueries: [
        {
          query: REQUESTS,
          variables: {
            where: {
              status: {
                equals: "PENDING",
              },
            },
          },
        },
      ],
    }
  );

  const [refuseRequest, { loading: refuseRequesttLoading }] = useMutation(
    REFUSE_REQUEST,
    {
      refetchQueries: [
        {
          query: REQUESTS,
          variables: {
            where: {
              status: {
                equals: "PENDING",
              },
            },
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (requestsData?.requests?.nodes) {
      let filteredRequests = [
        ...new Map(
          requestsData?.requests?.nodes.map((item: any, key: any) => [
            item[key],
            item,
          ])
        ).values(),
      ];
      setRequests(filteredRequests);
    }
  }, [requestsData]);

  if (
    requestsLoading ||
    !requestsData ||
    acceptRequestLoading ||
    refuseRequesttLoading
  ) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.requests}>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={requestsLoading}
          ListEmptyComponent={<EmptyPage text="No Requests In this Moment" />}
          renderItem={(itemData) => (
            <View style={styles.requestItem}>
              <Avatar diameter={60} imageUrl={itemData.item.user.avatar} />
              <CustomText
                styles={{ maxWidth: 100, overflow: "hidden" }}
                children={itemData.item.user.email}
              />
              <CustomButton
                icon="checkmark-circle-outline"
                iconColor={colors.green}
                buttonFunction={() =>
                  acceptRequest({
                    variables: {
                      acceptRequestId: itemData.item.id,
                    },
                  })
                }
                styles={styles.acceptBtnStyle}
              />
              <CustomButton
                icon="close-circle-outline"
                iconColor={colors.red}
                buttonFunction={() =>
                  refuseRequest({
                    variables: {
                      refuseRequestId: itemData.item.id,
                    },
                  })
                }
                styles={styles.acceptBtnStyle}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Requests;
