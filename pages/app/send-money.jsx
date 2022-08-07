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
  InputRightAddon,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "../../src/Layout/Auth/DashboardLayout";

function SendMoney() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    amount_to_send: "",
    amount_they_get: "",
    recepient_wallet_address_or_phone_number: "",
    selected_currency: "usd",
  });

  const currencyToSymbol = {
    usd: "$",
    gbp: "£",
  };

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
          How much are you sending ?
        </Heading>

        <FormControl mb="1rem">
          <FormLabel htmlFor="amount_to_send">You send</FormLabel>

          <InputGroup>
            <InputLeftAddon>
              {currencyToSymbol[formData.selected_currency]}
            </InputLeftAddon>
            <Input
              id="amount_to_send"
              type={"number"}
              placeholder="e.g. 400"
              name="amount_to_send"
              value={formData.amount_to_send}
              onChange={handleInputChange}
              required
            />
            <InputRightAddon>
              <Select
                variant={"flushed"}
                name="selected_currency"
                value={formData.selected_currency}
                onChange={handleInputChange}
              >
                <option value={"usd"}>USD</option>
                <option value={"gbp"}>GBP</option>
              </Select>
            </InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="recepient_wallet_address_or_phone_number">
            Recepient Wallet Address
          </FormLabel>
          <Input
            id="recepient_wallet_address_or_phone_number"
            type={"text"}
            placeholder="e.g. manny@gmail.com"
            name="recepient_wallet_address_or_phone_number"
            value={formData.recepient_wallet_address_or_phone_number}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="amount_they_get">Recepient gets</FormLabel>

          <InputGroup>
            <InputLeftAddon>e₦</InputLeftAddon>
            <Input
              id="amount_they_get"
              type={"text"}
              name="amount_they_get"
              value={formData.amount_they_get}
              disabled
            />
          </InputGroup>
        </FormControl>

        <Box mb={"2rem"}>
          <Flex justifyContent={"space-between"}>
            <Text>Fee: </Text>
            <Text>1%</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text>Transfer Time: </Text>
            <Text>~2 hours</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text>Today's Rate: </Text>
            <Text>
              1 {String(formData.selected_currency).toUpperCase()}=₦400
            </Text>
          </Flex>
        </Box>

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

export default SendMoney;
