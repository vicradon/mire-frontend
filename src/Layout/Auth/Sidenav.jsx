import { Image, Button, Flex, Link, Text, Grid } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { logout } from "../../api/auth";
import { handleError } from "../../utils/errorHandler";

function Sidenav() {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Grid
      gridTemplateRows={"1fr 10fr 1fr"}
      height={"100%"}
      color={"secondary.500"}
      bgColor={"#50534B"}
      padding={"1.5rem"}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <Image src={"/icons/Logo.png"} alt={"Mire logo"} />

      <Flex flexDirection={"column"} rowGap={"2rem"}>
        <NextLink passHref href={"/app"}>
          <Link>Home</Link>
        </NextLink>

        <NextLink passHref href={"/app/transactions"}>
          <Link>Transactions</Link>
        </NextLink>
      </Flex>

      <Button
        onClick={handleLogout}
        variant={"ghost"}
        colorScheme={"brand"}
        bgColor={"secondary"}
      >
        Logout
      </Button>
    </Grid>
  );
}

export default Sidenav;
