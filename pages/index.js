import {
  Box,
  Button,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import FeatureCard from "../src/components/cards/FeatureCard";
import WhyMireCard from "../src/components/cards/WhyMireCard";
import SendMoney from "../src/components/Modals/SendMoney";
import Footer from "../src/Layout/Guest/Footer";
import Navbar from "../src/Layout/Guest/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mire | Easy FX</title>
      </Head>
      <Box>
        <Box
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundImage={"url('/images/home-bg.png')"}
          height={"100vh"}
          color={"secondary.500"}
        >
          <Navbar />

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            flexDir={"column"}
            height={"80%"}
            rowGap={"2rem"}
          >
            <Text
              px={"2rem"}
              fontWeight={"bold"}
              fontSize={{ base: "40px", lg: "64px" }}
            >
              FX Transactions Made Easy with{" "}
              <Box color={"brand.500"} as={"span"}>
                eNaira
              </Box>
            </Text>
            <Text px={"2rem"}>
              Send foreign currency to your friends and relatives and they
              receive it in ENaira without the hassel of banks or Aboki.
            </Text>
            <SendMoney />
          </Flex>
        </Box>

        <Box bgColor={"brand.50"} paddingY={"80px"}>
          <Heading mb={"4rem"} textAlign={"center"}>
            How it Works
          </Heading>

          <Flex
            flexWrap={"wrap"}
            rowGap={"2rem"}
            justifyContent={"space-around"}
          >
            <WhyMireCard step={1}>
              <Heading fontSize={"lg"}>Register</Heading>
              <Text>
                Sign up with your email address , choose a strong pin and add
                your wallet ID.
              </Text>
            </WhyMireCard>
            <WhyMireCard step={2}>
              <Heading fontSize={"lg"}>Buy eNaira</Heading>
              <Text>
                Buy eNaire equivilant to the amount you want to send in your
                currency
              </Text>
            </WhyMireCard>
            <WhyMireCard step={3}>
              <Heading fontSize={"lg"}>Reciever's ID</Heading>
              <Text>
                Input your reciever's eNaire wallet ID and other information
                required.
              </Text>
            </WhyMireCard>
            <WhyMireCard step={4}>
              <Heading fontSize={"lg"}>Send </Heading>
              <Text>
                You are almost done! Transfer the money to the reciever at a low
                service fee.
              </Text>
            </WhyMireCard>
          </Flex>
        </Box>

        <Box
          id={"#enaira"}
          paddingY={"80px"}
          bgColor={"grey.500"}
          color={"secondary.500"}
        >
          <Grid
            mx={"4rem"}
            mb={"4rem"}
            columnGap={"2rem"}
            templateColumns={{ base: "100%", lg: "40% 60%" }}
            rowGap={"2rem"}
          >
            <GridItem>
              <Heading mb={"1rem"}>Do you have an eNaira wallet?</Heading>
              <Text mb={"1rem"}>
                Download the app or Scan the QR code now to get started{" "}
              </Text>

              <Image src="/images/enaira-qr-code.png" alt="ENaira QR code" />
            </GridItem>

            <GridItem display={{ base: "none", lg: "block" }}>
              <Image src="/images/enaira-devices.png" alt="ENaira Devices" />
            </GridItem>
          </Grid>

          <Center>
            <Button rounded={"full"} colorScheme={"brand"} bgColor={"brand"}>
              Learn More
            </Button>
          </Center>
        </Box>

        <Box paddingBottom={"80px"} bgColor={"grey.500"}>
          <Heading color={"secondary.500"} mb={"2rem"} textAlign={"center"}>
            Advantages of Using Mire
          </Heading>

          <Flex
            rowGap={"2rem"}
            columnGap={"2rem"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            <FeatureCard title={"Very Easy"} svg="/icons/edit.svg" />
            <FeatureCard
              title={"Low service fee "}
              svg="/icons/wallet-money.svg"
            />
            <FeatureCard
              title={"Secured Payment"}
              svg="/icons/security-card.svg"
            />
            <FeatureCard
              title={"Fast Transfers"}
              svg="/icons/convert-card.svg"
            />
            <FeatureCard
              title={"24/7 Customer care"}
              svg="/icons/call-received.svg"
            />
          </Flex>
        </Box>
        <Box id={"#faqs"} px={"4rem"} paddingY={"80px"} bgColor={"brand.50"}>
          <Heading mb={"2rem"} textAlign={"center"}>
            Frequently Asked Questions
          </Heading>

          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Is sending money through Mire safe?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What other currencies can we send money to?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
