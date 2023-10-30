import { toast } from "react-hot-toast";
import { IsendOtp, IsignupUser, IloginUser } from "../Interface";

export const sendOtp : IsendOtp = async (otpFunc, userDetails, setDisable, navigate) => {
  const toastId = toast.loading("Sending otp...");
  setDisable(true);
  try {
    const response = await otpFunc(userDetails).unwrap();
    console.log("otp api response", response);
    setDisable(false);
    toast.success("OTP sent successfully. Check you email");
    navigate("/auth/verify");
  } catch (error) {
    console.log("Error in send otp api", error);
    toast.error(
      "Something went wrong while sending otp. Please try again later"
    );
  }
  toast.dismiss(toastId);
  setDisable(false);
};

export const signUpUser : IsignupUser = async (signUpFunc, userDetails, setDisable, navigate) => {
  const toastId = toast.loading("Signing up...");
  setDisable(true);
  try {
    const response = await signUpFunc(userDetails).unwrap();
    console.log("signup user api response", response);
    toast.success("Signup successfully");
    setDisable(false);
    navigate("/");
  } catch (error: any) {
    console.log("Error in signup api", error);
    toast.error(error.data?.message);
  }
  toast.dismiss(toastId);
  setDisable(false);
};

export const loginUser : IloginUser = async ( loginFunc, userDetails, setDisable, navigate) => {
  const toastId = toast.loading("Logging in...");
  setDisable(true);
  try {
    const response = await loginFunc(userDetails).unwrap();
    toast.success("Logged In");
    setDisable(false);
    toast.dismiss(toastId);
    navigate("/");
    return response;
  } catch (error: any) {
    console.log("Error in login api", error);
    toast.error(error.data?.message);
  }
  toast.dismiss(toastId);
  setDisable(false);
};
