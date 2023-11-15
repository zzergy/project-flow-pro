import { Input } from "antd";

type Props = {
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  onChange?: React.ChangeEventHandler;
};

const InputField = ({
  name,
  className,
  placeholder,
  type,
  onChange,
}: Props) => {
  return (
    <Input
      name={name}
      className={className}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    ></Input>
  );
};

export default InputField;
