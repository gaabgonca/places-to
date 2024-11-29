import React, { ChangeEvent } from "react";

export interface FieldProps {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  textArea?: boolean;
  id: string;
  selectOptions?: string[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  [key: string]: any; // To allow any additional props like `className`, etc.
}

const Field: React.FC<FieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  textArea = false,
  id,
  selectOptions,
  value,
  onChange,
  ...props
}) => {
  const Component = textArea
    ? "textarea"
    : selectOptions
    ? "select"
    : "input";

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm leading-none" htmlFor={id}>
        {label}
      </label>
      <Component
        className="p-2 text-sm leading-none border rounded-sm border-mcqueen placeholder:text-mcqueen/50"
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {selectOptions &&
          selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </Component>
    </div>
  );
};

export default Field;
