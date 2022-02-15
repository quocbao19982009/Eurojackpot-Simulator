import React from "react";

import { useSelector } from "react-redux";

import { Navigate, useLocation } from "react-router-dom";

import { RootState } from "../store/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let { isLogin } = useSelector((state: RootState) => state.user);
  let location = useLocation();

  if (!isLogin) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
