import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import FormWrapper from "../Wrapper/FormWrapper";
import changeHandler from "../../utility/changeHandler";
import { ISignInUserState } from "../../Interface";
import CTAButton from "../Button/CTAButton";

interface ILoginProps {
  setPage: (x: boolean) => void;
}
const Login: React.FC<ILoginProps> = ({ setPage }) => {

  const [loginDetails, setLoginDetails] = useState<ISignInUserState>({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e, setLoginDetails, loginDetails);
  };

  return (
    <>
      <FormWrapper>
        <form
          className="max-[420px]:w-[90%] max-[580px]:w-[75%] w-[23rem] h-max min-[2200px]:min-w-[400px] flex flex-col gap-4 px-2 py-8 rounded-md min-[1120px]:justify-center bg-[#f6f7f5e2]"
          onSubmit={() => console.log("void")}
        >
          <p className="text-gray-500">Test Accounts</p>
          <div className="flex gap-6">
            <p>
              Email :- <span className="text-green-500">johndoe@gmail.com</span>
            </p>
            <p>
              Pass :- <span className="text-green-500">johndoe</span>
            </p>
          </div>
          <div className="flex gap-6">
            <p>
              Email :- <span className="text-green-500">janedoe@gmail.com</span>
            </p>
            <p>
              Pass :- <span className="text-green-500">janedoe</span>
            </p>
          </div>
          <h2 className="text-center font-lato md:text-4xl text-2xl text-gray-800 tracking-wide font-bold">
            Draw<span className="text-[#32d8af]">Board</span>
          </h2>
          <CustomInput
            name="email"
            type="email"
            autocomplete="off"
            placeholder="Enter email"
            required={true}
            onChange={handleChange}
            value={loginDetails.email}
          />

          <CustomInput
            name="password"
            type="password"
            autocomplete="off"
            placeholder="Enter password"
            required={true}
            onChange={handleChange}
            value={loginDetails.password}
            icon={BiShow}
            changeTo="text"
          />

          <CTAButton
            style="border-blue-600 hover:bg-blue-600"
            disable={disable}
          >
            Login
          </CTAButton>
        </form>
        <p className="">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-600 font-medium"
            onClick={() => setPage(false)}
          >
            SignUp
          </span>
        </p>

        <Link to="/" className="text-gray-400">
          Back to home
        </Link>
      </FormWrapper>
    </>
  );
};

export default Login;
