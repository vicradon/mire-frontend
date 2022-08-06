import {
  Box,
  Button,
  Checkbox,
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

import { register } from "../src/api/auth";
import Navbar from "../src/Layout/Guest/Navbar";
import { handleError } from "../src/utils/errorHandler";
import NextLink from "next/link";

function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const handleRegister = async ({ email, password }) => {
    try {
      const { data } = await register({ email, password });
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
        <form onSubmit={handleRegister}>
          <Box mb="1rem">
            <Heading size={"sm"}>Let's get you started.</Heading>
          </Box>

          <Flex columnGap={"2rem"} rowGap={"2rem"}>
            <FormControl mb="1rem">
              <FormLabel htmlFor="email">First name</FormLabel>
              <Input id="first_name" type="text" placeholder="e.g. Busola" />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel htmlFor="email">Last name</FormLabel>
              <Input id="last_name" type="text" placeholder="e.g. Saraki" />
            </FormControl>
          </Flex>

          <FormControl mb="1rem">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="e.g. hack.analytics@gmail.com"
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel htmlFor="phone_number">Phone number</FormLabel>
            <Input
              id="phone_number"
              type="phone"
              placeholder="e.g. +2348038038034"
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

          <FormControl mb="1rem">
            <Checkbox id="legal">
              By clicking, you agree to our <Link>Terms of Service</Link> and{" "}
              <Link>Privacy Policy</Link>
            </Checkbox>
          </FormControl>

          <Button
            size="lg"
            colorScheme="brand"
            bg="brand.500"
            width="100%"
            type="submit"
            mb="1rem"
          >
            Create account
          </Button>
        </form>

        <Flex
          columnGap=".5rem"
          alignSelf="end"
          pb="1rem"
          justifyContent="center"
        >
          <Text>Already have an account?</Text>

          <NextLink href={"/login"} passHref>
            <Link>Login</Link>
          </NextLink>
        </Flex>
      </Grid>
    </Box>
  );
}

export default Register;
