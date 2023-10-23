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
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    elementType: string | undefined
  ): any;
}

export interface IUpdateElement{
  (
    id: number,
    generator: any,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    elementType: string | undefined,
    elements : any,
    setElements : (element : any) => void
  ): any;
}

export interface IAdjustCoordinates {
  (
    elements : any
  ) : any
}