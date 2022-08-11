import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Text,
  Stack,
  Flex,
  Table,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../../src/api/transaction";
import DashboardLayout from "../../src/Layout/Auth/DashboardLayout";
import { handleError } from "../../src/utils/errorHandler";
import { Button, ButtonGroup } from "@chakra-ui/react";
import TransactionsTable from "../../src/components/Tables/TransactionsTable";

function Transactions() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch(handleError);
  }, []);

  return (
    <DashboardLayout title={"Balances"}>
      <Tabs
        mb={"2rem"}
        onChange={(index) => setTabIndex(index)}
        variant="enclosed"
      >
        <TabList>
          <Tab border={"none"} bgColor={tabIndex === 0 ? "#555555" : ""}>
            <Image
              width={"20px"}
              src="/icons/enaira-icon.svg"
              alt="enaira icon"
            />
            <Text color={"white"} ml={"0.5rem"}>
              Enaira
            </Text>
          </Tab>
          <Tab border={"none"} bgColor={tabIndex === 1 ? "#555555" : ""}>
            <Text color={"white"}>$</Text>
            <Text color={"white"} ml={"0.5rem"}>
              USD
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bgColor={"#555555"}>
            <Flex alignItems={"center"} flexDirection={"column"}>
              <Text>Available Balance</Text>
              <Flex alignItems={"center"}>
                <Image
                  width={"40px"}
                  src="/icons/enaira-icon.svg"
                  alt="enaira icon"
                />
                <Text ml={"0.5rem"} fontSize={"4xl"}>
                  10,000
                </Text>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel bgColor={"#555555"}>
            <Flex alignItems={"center"} flexDirection={"column"}>
              <Text>Available Balance</Text>
              <Flex fontSize={"4xl"} alignItems={"center"}>
                <Text>$</Text>
                <Text>100</Text>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Stack direction="row" justifyContent={"center"} mb={"4rem"} gap="4">
        <Button variant={"outline"} colorScheme="brand">
          Deposit
        </Button>
        <Button variant={"outline"} colorScheme="brand">
          Withdraw
        </Button>
        <Button variant={"outline"} colorScheme="brand">
          Swap Currencies
        </Button>
      </Stack>

      <Box>
        <Heading size={"md"}>Your transaction history</Heading>

        <TransactionsTable transactions={transactions} />
      </Box>
    </DashboardLayout>
  );
}

export default Transactions;
