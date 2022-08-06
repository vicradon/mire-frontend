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
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";

function Signup() {
  return (
    <Grid
      height="100vh"
      templateColumns={{ base: "100%", lg: "45% 55%" }}
      p={{ base: "2rem", lg: "0" }}
    >
      <Box
        display={{ base: "none", lg: "block" }}
        height="100%"
        bg="gray"
        backgroundImage={`url(${girlInLibrary})`}
        backgroundSize="cover"
        backgroundPosition={"center"}
      />
      <Grid py={"3rem"} gridTemplateRows="100px auto 80px" justifySelf="center">
        <Box>
          <Text color={"brand.500"} fontWeight={"bold"} fontSize={"2xl"}>
            Proctify
          </Text>
        </Box>

        <form onSubmit={handleLogin}>
          <Box mb="1rem">
            <Heading size={"lg"}>Create your account</Heading>
            <Text>Let's get you started. Create an account to begin</Text>
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
            <Input
              id="password"
              type="password"
              placeholder="e.g. hack.analytics@gmail.com"
            />
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
          <Link to="/register">Register</Link>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default Signup;
