import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import http from "../../src/api";
import DashboardLayout from "../../src/Layout/Auth/DashboardLayout";
import NextLink from "next/link";

function Index() {
  useEffect(() => {
    http.get("/users/me").then(({ data }) => {
      console.log(data);
    });
  }, []);
  return (
    <DashboardLayout>
      <Flex
        height={"80vh"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <NextLink passHref href={"/app/send-money"}>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"300px"}
            h={"200px"}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"brand.500"}
          >
            <Image mb={"1rem"} src={"/icons/money-send.png"} alt="send money" />
            <Text fontSize={"xl"}>Send Money</Text>
          </Flex>
        </NextLink>

        <NextLink passHref href={"/app/receive-money"}>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"300px"}
            h={"200px"}
            rounded={"lg"}
            border={"1px solid"}
            borderColor={"brand.500"}
          >
            <Image
              mb={"1rem"}
              src={"/icons/money-receive.png"}
              alt="send money"
            />
            <Text fontSize={"xl"}>Convert Foreign Currency</Text>
          </Flex>
        </NextLink>
      </Flex>
    </DashboardLayout>
  );
}

export default Index;

// "https://rgw.k8s.apis.ng/centric-platforms/uat/enaira-user/GetUserDetailsByPhone",
// {
//   phone_number: "08056064768",
//   user_type: "USER",
//   channel_code: "APISNG",
// },
// {
//   headers: {
//     ClientId: "3add9208e43c180fc0c5379a2283ea14",
//   },
// }
