import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../src/api/auth";
import Navbar from "../src/Layout/Guest/Navbar";
import { handleError } from "../src/utils/errorHandler";
import NextLink from "next/link";

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await login({ email, password });
      Cookies.set("userToken", data.token);
      window.location.href = "/app";
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Box height={"100vh"}>
      <Navbar />
      <Grid p={"3rem"} justifySelf="center">
        <form onSubmit={handleLogin}>
          <Box mb="1rem">
            <Heading size={"sm"}>Welcome back!</Heading>
          </Box>

          <FormControl mb="1rem">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="e.g. hack.analytics@gmail.com"
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel htmlFor="password">Password</FormLabel>

            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="e.g. hack.analytics@gmail.com"
              />
              <InputRightAddon>
                <Button
                  size="sm"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightAddon>
            </InputGroup>
          </FormControl>

          <Button
            size="lg"
            colorScheme="brand"
            bg="brand.500"
            width="100%"
            type="submit"
            mb="1rem"
          >
            Login
          </Button>
        </form>

        <Flex
          columnGap=".5rem"
          alignSelf="end"
          pb="1rem"
          justifyContent="center"
        >
          <Text>Don't have an account?</Text>

          <NextLink href={"/register"} passHref>
            <Link>Register</Link>
          </NextLink>
        </Flex>
      </Grid>
    </Box>
  );
}

export default Login;
