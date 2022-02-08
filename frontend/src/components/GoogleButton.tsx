import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from "../actions/userAction";
import { useDispatch } from "react-redux";

const GoogleButton = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    const googleID = response.profileObj.googleId;
    const avatar = response.profileObj.imageUrl;
    dispatch(loginWithGoogle(email, name, googleID, avatar));
  };

  return (
    <GoogleLogin
      clientId="264479907073-cgmup061etj0ncjtch3s28r60v6l1177.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={(e) => responseGoogle(e)}
      onFailure={(e) => responseGoogle(e)}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleButton;
