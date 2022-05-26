import React from "react";
import { Typography } from "@mui/material";

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
        the instant result response. Users can topup their in game bank account.
        Users can view their game history, topup hisotry. Website is responsive.
        User stay login when refresh.
      </Typography>
      <Typography component={"h2"} variant={"h4"} marginTop={"2rem"}>
        Project Stack
      </Typography>
      <Typography component={"h3"} variant={"h6"} marginTop={"1rem"}>
        Frontend: ReactJS, TypeScripts, Redux, Material UI.
      </Typography>

      <Typography component={"h3"} variant={"h6"} marginTop={"1rem"}>
        Backend: Node JS, Express JS, TypeScripts, JWT Token, Bcryptjs.
      </Typography>

      <Typography component={"h3"} variant={"h6"} marginTop={"1rem"}>
        Database: MongoDB, Mongoose.
      </Typography>
    </>
  );
};

export default HomeScreen;
