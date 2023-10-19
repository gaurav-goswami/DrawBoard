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
  changeTo ?: string
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
  email : string,
  password : string
}

export interface ISignupUserState {
  username : string,
  email : string,
  password : string
}

export interface ICTAButtonProps {
  children: React.ReactNode;
  style?: string;
  disable ?: boolean;
  fn?: React.MouseEventHandler<HTMLButtonElement>;
}