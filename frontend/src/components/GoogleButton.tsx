import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const GoogleButton = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
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
