import React from "react";
import CustomInput from "./CustomInput";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import FormWrapper from "../Wrapper/FormWrapper";

interface ISignUpProps {
  setPage: (x: boolean) => void;
}

const SignUp: React.FC<ISignUpProps> = (props) => {
  const { setPage } = props;

  return (
    <>
      <FormWrapper>
        <form
          className="max-[420px]:w-[90%] max-[580px]:w-[75%] w-[23rem] h-max min-[2200px]:min-w-[400px] flex flex-col gap-4 px-2 py-8 rounded-md min-[1120px]:justify-center bg-[#f6f7f5e2]"
          onSubmit={() => console.log("void")}
        >
          <h2 className="text-center font-lato md:text-4xl text-2xl text-gray-800 tracking-wide font-bold">
            Draw<span className="text-[#32d8af]">Board</span>
          </h2>

          <CustomInput
            name="username"
            type="text"
            autocomplete="off"
            placeholder="Enter username"
            required={true}
            onChange={() => console.log("void")}
            value={""}
          />

          <CustomInput
            name="email"
            type="email"
            autocomplete="off"
            placeholder="Enter email"
            required={true}
            onChange={() => console.log("void")}
            value={""}
          />

          <CustomInput
            name="password"
            type="password"
            autocomplete="off"
            placeholder="Enter password"
            required={true}
            onChange={() => console.log("void")}
            value={""}
            icon={BiShow}
          />

          {/* <CTAButton
            style="border-green-500 hover:bg-green-500"
            disable={disable}
          >
            Signup
          </CTAButton> */}
        </form>
        <p className="">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-green-600 font-medium"
            onClick={() => setPage(true)}
          >
            Login
          </span>
        </p>

        <Link to="/" className="text-gray-400">
          Back to home
        </Link>
      </FormWrapper>
    </>
  );
};

export default SignUp;
