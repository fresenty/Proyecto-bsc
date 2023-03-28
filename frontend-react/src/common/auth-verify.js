import React, { useEffect } from "react";
import { withRouter } from "./with-router";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const { router, logOut } = props;
  let location = router.location;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);

  return <div></div>;
};

export default withRouter(AuthVerify);
