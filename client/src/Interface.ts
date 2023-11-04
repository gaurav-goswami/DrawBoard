import { IconType } from "react-icons";

export interface ICustomInputProps {
  type: string | undefined;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  style?: string;
  autocomplete?: string;
  icon?: IconType;
  changeTo?: string;
}

export interface IChangeHandler {
  <T>(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<T>>,
    state: T
  ): void;
}

export interface ISignInUserState {
  email: string;
  password: string;
}

export interface ISignupUserState {
  username: string;
  email: string;
  password: string;
}

export interface ICTAButtonProps {
  children: React.ReactNode;
  style?: string;
  disable?: boolean;
  fn?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IElement {
  (
    id: number,
    generator: any,
    x1: number | undefined,
    y1: number,
    x2: number | null,
    y2: number | null,
    elementType ?: string | undefined
  ): any;
}

export interface IUpdateElement {
  (
    id: number,
    generator: any,
    x1: number,
    y1: number,
    x2: number | null,
    y2: number | null,
    elementType: string | undefined,
    elements: any,
    setElements: (element: any, overwrite : boolean) => void,
    options ?: any,
    context ?: any
  ): any;
}

export interface IAdjustCoordinates {
  (elements: any): any;
}

export interface IDrawElement {
  (
    roughCanvas : any,
    context : any,
    element : any,
  ) : void;
}







export interface IRegisterUserState {
  username: string;
  email: string;
  password: string;
  otp?: string | number;
}

export interface ISendOtpResponse {
  success: string;
  message: string;
}

export interface ICommonInterface {
  setDisable: (x: boolean) => void;
  navigate: (to: string) => void;
}

interface ILoginUser extends ICommonInterface {
  loginFunc: (userDetails: any) => void | any;
  userDetails: ISignInUserState;
}

interface ISignupUser extends ICommonInterface {
  signUpFunc: (userDetails: any) => void | any;
  userDetails: IRegisterUserState;
}

interface ISendOtp extends ICommonInterface {
  otpFunc: (userDetails: any) => void | any;
  userDetails: IRegisterUserState;
}

export interface IsendOtp {
  <T>(
    otpFunc: ISendOtp["otpFunc"],
    userDetails: ISendOtp["userDetails"],
    setDisable: ISendOtp["setDisable"],
    navigate: ISendOtp["navigate"]
  ): Promise<T> | any;
}

export interface IsignupUser {
  <T>(
    signUpFunc: ISignupUser["signUpFunc"],
    userDetails: ISignupUser["userDetails"],
    setDisable: ISignupUser["setDisable"],
    navigate: ISignupUser["navigate"]
  ): Promise<T> | any;
}

export interface IloginUser {
  <T>(
    loginFunc: ILoginUser["loginFunc"],
    userDetails: ILoginUser["userDetails"],
    setDisable: ILoginUser["setDisable"],
    navigate: ILoginUser["navigate"]
  ): Promise<T> | any;
}
