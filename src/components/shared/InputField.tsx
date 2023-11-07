type Props = {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  onChange?: React.ChangeEventHandler;
};

const InputField = ({
  type,
  name,
  placeholder,
  className,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    ></input>
  );
};

export default InputField;
