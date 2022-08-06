import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function Navbar() {
  return (
    <Flex
      paddingX={"1rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>
        <Image src="/icons/Logo.png" alt="Mire" />
      </Box>

      <Flex columnGap={"1rem"}>
        <Link to="#about">About</Link>
        <Link to="#how-it-works">How it works</Link>
        <Link to="#enaira">eNaira</Link>
        <Link to="#faqs">FAQs</Link>
      </Flex>

      <Flex alignItems={"center"} columnGap={"1rem"}>
        <NextLink passHref href={"/login"}>
          <Link>Login</Link>
        </NextLink>
        <NextLink passHref href={"/register"}>
          <Button
            color={"secondary.500"}
            rounded={"full"}
            colorScheme="grey"
            bg={"grey"}
            variant="link"
            padding={"0.5rem 1rem"}
          >
            Register
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
}

export default Navbar;
