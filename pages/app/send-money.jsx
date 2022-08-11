import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
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
    receiver_wallet_alias: "",
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
        receiver_wallet_alias: formData.receiver_wallet_alias,
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
            <FormLabel htmlFor="receiver_wallet_alias">
              Recepient Wallet Address
            </FormLabel>
            <Input
              id="receiver_wallet_alias"
              type={"text"}
              placeholder="e.g. manny@gmail.com"
              name="receiver_wallet_alias"
              value={formData.receiver_wallet_alias}
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
          <Heading>
            Send {formData.amount_to_send}{" "}
            {transactionResponse.virtual_account_details.account_denomination}{" "}
            to this virtual account
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              xl: "1fr 1fr 1fr",
            }}
            rowGap={"2rem"}
            paddingY={"2rem"}
          >
            <Box>
              <Heading size={"body"}>Account name</Heading>
              <Text>
                {transactionResponse.virtual_account_details.account_name}
              </Text>
            </Box>
            <Box>
              <Heading size={"body"}>Account number</Heading>
              <Text>
                {transactionResponse.virtual_account_details.account_number}
              </Text>
            </Box>

            <Box>
              <Heading size={"body"}>Account balance</Heading>
              <Text>
                {transactionResponse.virtual_account_details.account_balance}
              </Text>
            </Box>

            <Box>
              <Heading size={"body"}>Account denomination</Heading>
              <Text>
                {
                  transactionResponse.virtual_account_details
                    .account_denomination
                }
              </Text>
            </Box>
          </Grid>

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
          <Text mb={"1rem"}>
            Successfully sent {formData.amount_they_get.toLocaleString()} ENaira
            to {formData.receiver_wallet_alias}
          </Text>

          <NextLink passHref href={"/app"}>
            <Button colorScheme={"brand"}>Go back home</Button>
          </NextLink>
        </Box>
      )}
    </DashboardLayout>
  );
}

export default SendMoney;
