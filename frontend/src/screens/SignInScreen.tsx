import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as LinkUI } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "../components/layout/Container";
import { Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import { login } from "../actions/userAction";
import { Password } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      dispatch(login(email, password));
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <LinkUI to="/signup" component={Link} variant="body2">
                {"Don't have an account? Sign Up"}
              </LinkUI>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography component="span" variant="h6">
              OR
            </Typography>
            <GoogleButton />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginScreen;
