import React from "react";
import { Container as ContainerUI, Box } from "@mui/material";
import Alert from "./Alert";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />

        <ContainerUI component="main" sx={{ mt: "2rem" }}>
          <Alert />

          {children}
        </ContainerUI>
        <Footer />
      </Box>
    </>
  );
};

export default Container;
