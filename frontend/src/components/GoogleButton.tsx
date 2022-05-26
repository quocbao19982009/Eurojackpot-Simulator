import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";

import { loginWithGoogle } from "../actions/userAction";

const GoogleButton = () => {
  const dispatch = useDispatch();

  const responseGoogleSuccess = (response: any) => {
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    const googleID = response.profileObj.googleId;
    const avatar = response.profileObj.imageUrl;
    dispatch(loginWithGoogle(email, name, googleID, avatar));
  };
  const responseGoogleFail = (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="264479907073-cgmup061etj0ncjtch3s28r60v6l1177.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={(e) => responseGoogleSuccess(e)}
      onFailure={(e) => responseGoogleFail(e)}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleButton;
