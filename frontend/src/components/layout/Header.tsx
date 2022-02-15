import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Image from "../../resources/hero.png";
const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#72008c", color: "#fff" }}>
      <Container
        sx={{
          backgroundImage: `url(${Image})`,
          height: "12rem",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <Typography
          component={"h1"}
          variant={"h4"}
          fontWeight="900"
          fontSize={"2rem"}
        >
          Eurojackpot
        </Typography>
        <Typography>c. 32 000 000 €</Typography>
      </Container>
    </Box>
  );
};

export default Header;
