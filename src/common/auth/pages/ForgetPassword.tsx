import { useState } from "react";
import GetOtp from "./GetOtp";
import MatchOtp from "./MatchOtp";
import ResetPassword from "./ResetPassword";

const ForgetPassword = () => {
  const [stateSuccess, setStateSuccess] = useState({
    successOtp: false,
    successMatchOtp: false,
  });
  console.log(stateSuccess);
  return (
    <>
      {!stateSuccess.successOtp && <GetOtp setStateSuccess={setStateSuccess} />}
      {!stateSuccess.successMatchOtp && stateSuccess.successOtp && (
        <MatchOtp setStateSuccess={setStateSuccess} />
      )}
      {stateSuccess.successMatchOtp && <ResetPassword />}
    </>
  );
};

export default ForgetPassword;
