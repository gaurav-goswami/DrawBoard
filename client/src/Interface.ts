import { IconType } from "react-icons";

export interface ICustomInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  style?: string;
  autocomplete?: string;
  icon?: IconType;
}
