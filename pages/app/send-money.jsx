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
import React, { useEffect, useState } from "react";
import { createTransaction } from "../../src/api/transaction";
import DashboardLayout from "../../src/Layout/Auth/DashboardLayout";
import { handleError } from "../../src/utils/errorHandler";

function SendMoney() {
  const steps = [
    "initiate_transaction_and_get_account_number",
    "send_money_to_account_number",
    "enaira_is_sent",
  ];
  const [transactionResponse, setTransactionResponse] = useState({});
  const [activeStep, setActiveStep] = React.useState(steps[0]);
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    amount_to_send: "",
    amount_they_get: "",
    recepient_wallet_address_or_phone_number: "",
    selected_currency: "USD",
  });
  const [loadingStates, setLoadingStates] = useState({
    initiate_transaction_and_get_account_number: false,
    send_money_to_account_number: false,
    enaira_is_sent: false,
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      amount_they_get: prevState.amount_to_send * 400,
    }));
  }, [formData.amount_to_send]);

  const currencyToSymbol = {
    USD: "$",
  };

  const initiateTransfer = async (event) => {
    try {
      event.preventDefault();
      setLoadingStates({
        ...loadingStates,
        initiate_transaction_and_get_account_number: true,
      });

      const data = await createTransaction({
        amount: formData.amount_to_send,
        currency: formData.selected_currency,
        receiver_wallet_alias:
          formData.recepient_wallet_address_or_phone_number,
      });
      setTransactionResponse(data);

      setActiveStep(steps[1]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingStates({
        ...loadingStates,
        initiate_transaction_and_get_account_number: false,
      });
    }
  };

  const verifyBalance = async () => {
    try {
      setLoadingStates({
        ...loadingStates,
        send_money_to_account_number: true,
      });

      setTimeout(() => {
        setLoadingStates({
          ...loadingStates,
          send_money_to_account_number: false,
        });
        setActiveStep(steps[2]);
      }, 5000);
    } catch (error) {
      handleError(error);
    }
  };

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <DashboardLayout>
      {activeStep === steps[0] && (
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
              <InputLeftAddon bgColor={"grey.500"}>
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
              <InputRightAddon bgColor={"grey.500"}>
                <Select
                  variant={"flushed"}
                  name="selected_currency"
                  value={formData.selected_currency}
                  onChange={handleInputChange}
                >
                  <option value={"usd"}>USD</option>
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
              <InputLeftAddon bgColor={"grey.500"}>e₦</InputLeftAddon>
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
            isLoading={
              loadingStates.initiate_transaction_and_get_account_number
            }
            loadingText="Creating transaction and retrieving account number"
          >
            Proceed
          </Button>
        </Box>
      )}
      {activeStep === steps[1] && (
        <Box>
          <Text>
            Send USD to this account number{" "}
            {transactionResponse.usd_account_number}
          </Text>

          <Button
            isLoading={loadingStates.send_money_to_account_number}
            loadingText="Verifying amount sent"
            colorScheme={"brand"}
            onClick={verifyBalance}
          >
            I have sent the money
          </Button>
        </Box>
      )}
      {activeStep === steps[2] && (
        <Box>
          <Text>
            Successfully sent {formData.amount_they_get.toLocaleString()} ENaira
            to {formData.recepient_wallet_address_or_phone_number}
          </Text>

          <NextLink passHref href={"/app"}>
            <Button>Go back home</Button>
          </NextLink>
        </Box>
      )}
    </DashboardLayout>
  );
}

export default SendMoney;
