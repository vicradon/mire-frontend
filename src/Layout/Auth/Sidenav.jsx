import { Image, Button, Flex, Link, Text, Grid } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  // const linkColor = router.pathname
  return (
    <Grid
      gridTemplateRows={"1fr 10fr 1fr"}
      height={"100%"}
      padding={"1.5rem"}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <Image src={"/icons/Logo.png"} alt={"Mire logo"} />

      <Flex flexDirection={"column"} rowGap={"2rem"}>
        <NextLink passHref href={"/app"}>
          <Link color={router.pathname === "/app" ? "#FFFFFF" : "#9f9f9f"}>
            Home
          </Link>
        </NextLink>

        <NextLink passHref href={"/app/transactions"}>
          <Link
            color={
              router.pathname === "/app/transactions" ? "#FFFFFF" : "#9f9f9f"
            }
          >
            Transactions
          </Link>
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
