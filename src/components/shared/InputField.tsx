type Props = {
  type: string;
  placeholder: string;
  className?: string;
};

const InputField = ({ type, placeholder, className }: Props) => {
  return (
    <input type={type} placeholder={placeholder} className={className}></input>
  );
};

export default InputField;
