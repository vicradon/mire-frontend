import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Flex
      paddingY="40px"
      bgColor={"grey.500"}
      color={"secondary.500"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      <Image src="/icons/Logo.png" alt="Mire" />
      <Flex flexWrap={"wrap"} columnGap={"1rem"}>
        <Link to="#">Privacy Policy</Link>
        <Link to="#">Terms and Conditions</Link>
        <Link to="#">Contact Us</Link>
        <Link to="#">Careers</Link>
      </Flex>
    </Flex>
  );
}

export default Footer;
