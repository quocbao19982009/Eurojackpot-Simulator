import { Container as ContainerUI, Box, Paper } from "@mui/material";

import Alert from "./Alert";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";

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
        <Header />
        <ContainerUI component="main" sx={{ mt: "2rem", marginBottom: "2rem" }}>
          <Paper elevation={4} sx={{ padding: "2rem" }}>
            <Alert />
            {children}
          </Paper>
        </ContainerUI>
        <Footer />
      </Box>
    </>
  );
};

export default Container;
