import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DashboardLayout from "../../src/Layout/Auth/DashboardLayout";
import { IoWalletOutline } from "react-icons/io5";
import { useRouter } from "next/router";

function SendToForeignAccountForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    recepient_wallet_address_or_phone_number: "",
  });

  const initiateTransfer = (event) => {
    event.preventDefault();
    console.log(formData);
    router.push("/app/send-to-foreign-account");
  };

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const [recepient, setRecepient] = useState("others");

  return (
    <DashboardLayout>
      <Box
        paddingTop={"40px"}
        margin={"0 auto"}
        width={{ md: "90%", lg: "60%", xl: "50%" }}
        as="form"
        onSubmit={initiateTransfer}
      >
        <Heading mb={"2rem"} size={"body"}>
          Who are you sending to?
        </Heading>

        <RadioGroup mb={"2rem"} onChange={setRecepient} value={recepient}>
          <Stack>
            <Radio value="personal-wallet">Personal Wallet</Radio>
            <Radio value="others">Others</Radio>
          </Stack>
        </RadioGroup>

        {recepient === "others" && (
          <FormControl mb={"2rem"}>
            <FormLabel>
              Enter the recepient's wallet address or phone number
            </FormLabel>
            <InputGroup>
              {/* eslint-disable-next-line react/no-children-prop */}
              <InputLeftElement children={<IoWalletOutline />} />

              <Input
                id="recepient_wallet_address_or_phone_number"
                type={"text"}
                placeholder="e.g. +234-555-555-5555"
                name="recepient_wallet_address_or_phone_number"
                value={formData.recepient_wallet_address_or_phone_number}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
          </FormControl>
        )}

        <Button
          width={"100%"}
          type="submit"
          colorScheme={"brand"}
          variant="solid"
        >
          Proceed
        </Button>
      </Box>
    </DashboardLayout>
  );
}

export default SendToForeignAccountForm;
