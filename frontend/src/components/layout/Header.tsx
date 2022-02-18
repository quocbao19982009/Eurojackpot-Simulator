import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import ImageDesktop from "../../resources/hero.png";
import ImageMobile from "../../resources/heroMobile.png";
const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#72008c", color: "#fff" }}>
      <Container
        sx={{
          backgroundImage: {
            xs: `url(${ImageMobile}) `,
            md: `url(${ImageDesktop})`,
          },
          height: {
            md: "12rem",
            xs: "10rem",
          },
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <Box
          component={"h1"}
          fontWeight="900"
          fontSize={"2rem"}
          sx={{
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },
          }}
        >
          Eurojackpot
        </Box>
        <Typography>c. 32 000 000 €</Typography>
      </Container>
    </Box>
  );
};

export default Header;
