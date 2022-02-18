import { Typography } from "@mui/material";
import React from "react";

const HomeScreen = () => {
  return (
    <>
      <Typography component={"h1"} variant={"h3"} textAlign={"center"}>
        Welcome to Eurojackpot Simulator
      </Typography>

      <Typography component={"h2"} variant={"h4"} marginTop={"2rem"}>
        What is this website?
      </Typography>
      <Typography>
        This is a website that simulates Eurojackpot Simulator, the design is
        inspired by Veikkaus with "minimal design". Users can play lotto with
        this website. The result will be generate randomly by the server.
      </Typography>
      <Typography component={"h2"} variant={"h4"} marginTop={"2rem"}>
        Feature of the website
      </Typography>
      <Typography component={"h3"} variant={"h5"} marginTop={"2rem"}>
        Frontend: ReactJS, TypeScripts, Redux
      </Typography>
      <Typography>
        Users can play lotto with the instant result response. Users can topup
        their in game bank account. Users can view their game history, topup
        hisotry. Website is responsive. User stay login when refresh.
      </Typography>
      <Typography component={"h3"} variant={"h5"} marginTop={"2rem"}>
        Backend:
      </Typography>
      <Typography></Typography>
    </>
  );
};

export default HomeScreen;
