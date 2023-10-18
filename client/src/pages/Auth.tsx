import React, { useState } from "react";
import Login from "../components/Form/Login";
import SignUp from "../components/Form/Signup";

const Auth: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    <>
      {isLoginPage ? (
        <Login setPage={setIsLoginPage} />
      ) : (
        <SignUp setPage={setIsLoginPage} />
      )}
    </>
  );
};

export default Auth;
