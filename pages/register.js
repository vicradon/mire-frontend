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
import Cookies from "js-cookie";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      console.log(formData);
      const data = await register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
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
        <form onSubmit={handleRegister}>
          <Box mb="1rem">
            <Heading size={"sm"}>Let's get you started.</Heading>
          </Box>

          <Flex columnGap={"2rem"} rowGap={"2rem"}>
            <FormControl mb="1rem">
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                id="first_name"
                type="text"
                placeholder="e.g. Busola"
                required
              />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                id="last_name"
                type="text"
                placeholder="e.g. Saraki"
              />
            </FormControl>
          </Flex>

          <FormControl mb="1rem">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              id="email"
              type="email"
              placeholder="e.g. hack.analytics@gmail.com"
              required
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel htmlFor="phone_number">Phone number</FormLabel>
            <Input
              name="phone_number"
              onChange={handleInputChange}
              value={formData.phone_number}
              id="phone_number"
              type="phone"
              placeholder="e.g. +2348038038034"
              required
            />
          </FormControl>

          <FormControl mb="1rem">
            <FormLabel htmlFor="password">Password</FormLabel>

            <InputGroup>
              <Input
                id="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="e.g. hack.analytics@gmail.com"
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

          <FormControl mb="1rem">
            <Checkbox required id="legal">
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
