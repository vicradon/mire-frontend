import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { colors } from "../src/theme/colors";
import { Heading } from "../src/theme/Heading";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({ colors, components: { Heading } });

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
