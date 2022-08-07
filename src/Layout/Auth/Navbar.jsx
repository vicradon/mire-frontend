import { Avatar, Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import Nextlink from "next/link";

function Navbar() {
  return (
    <Flex justifyContent={"flex-end"} width={"100%"}>
      <Button
        bgColor={"grey.500"}
        rounded={"lg"}
        paddingRight={"1rem"}
        marginRight={"0.5rem"}
      >
        <Image src={"/icons/notification.svg"} alt="notifications" />
      </Button>
      <Nextlink passHref href={"/profile"}>
        <Button
          bgColor={"white"}
          rounded={"lg"}
          paddingRight={"1rem"}
          marginRight={"0.5rem"}
        >
          <Avatar name="Joy Nwakaego" />
        </Button>
      </Nextlink>
    </Flex>
  );
}

export default Navbar;
