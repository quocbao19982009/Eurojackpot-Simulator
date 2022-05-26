import React, { useEffect } from "react";

import GameScreen from "./screens/GameScreen";
import LoginScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Routes, Route } from "react-router-dom";
import Container from "./components/layout/Container";
import ProfileScreen from "./screens/ProfileScreen";
import TransitionScreen from "./screens/TransitionScreen";
import GameHistoryScreen from "./screens/GameHistoryScreen";
import PrivateRoute from "./components/PrivateRoute";
import GameRule from "./screens/GameRule";
import NotFoundScreen from "./screens/NotFoundScreen";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./actions/userAction";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const dispatch = useDispatch();

  const tokenFromStorage = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")!)
    : null;

  useEffect(() => {
    if (tokenFromStorage) {
      dispatch(getUserInfo(tokenFromStorage));
    }
  }, [tokenFromStorage, dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="/home" element={<HomeScreen />} />
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
        <Route path="/rule" element={<GameRule />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Container>
  );
}

export default App;
