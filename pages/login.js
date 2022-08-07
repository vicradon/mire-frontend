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
import Cookies from "js-cookie";
import NextLink from "next/link";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      Cookies.set("userToken", data.token);
      window.location.href = "/app";
    } catch (error) {
      handleError(error);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel htmlFor="password">Password</FormLabel>

            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="e.g. hack.analytics@gmail.com"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
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
