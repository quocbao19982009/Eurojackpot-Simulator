import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Made By "}
      <Link color="inherit" href="https://github.com/quocbao19982009">
        Bao Nguyen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",

        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container
        sx={{ display: "flex", justifyContent: "center" }}
        maxWidth="sm"
      >
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
