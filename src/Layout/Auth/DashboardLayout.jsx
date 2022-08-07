import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

function DashboardLayout({ children }) {
  return (
    <Grid
      position={"relative"}
      gridTemplateColumns={"250px 1fr"}
      minHeight={"100vh"}
    >
      <Box>
        <Box height={"100vh"} pos={"fixed"}>
          <Sidenav />
        </Box>
      </Box>

      <Box>
        <Box padding={"1rem"} pb={"2rem"}>
          <Navbar />
        </Box>
        <Box padding={{ md: "0.5rem", lg: "3rem" }}>{children}</Box>
      </Box>
    </Grid>
  );
}

export default DashboardLayout;
