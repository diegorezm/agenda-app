interface InputProps {
  label: string;
  value: string;
  type?: string | "text";
  onChange: (value: string) => void;
}

export const Input = ({ label, type,value, onChange }: InputProps) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-1/2 bg-gray-50 text-center rounded-full"
        required
      />
    </>
  );
};
