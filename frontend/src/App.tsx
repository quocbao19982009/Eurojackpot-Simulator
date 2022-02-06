import React from "react";
import Navbar from "./components/layout/Navbar";
import GameScreen from "./screens/GameScreen";
import LoginScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="signin" element={<LoginScreen />} />
        <Route path="signup" element={<SignUpScreen />} />
      </Routes>
    </Container>
  );
}

export default App;
