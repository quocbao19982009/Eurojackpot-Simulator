import React from "react";
import Navbar from "./components/layout/Navbar";
import GameScreen from "./screens/GameScreen";
import LoginScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import ProfileScreen from "./screens/ProfileScreen";
import TransitionScreen from "./screens/TransitionScreen";
import GameHistoryScreen from "./screens/GameHistoryScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <TransitionScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <GameHistoryScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
