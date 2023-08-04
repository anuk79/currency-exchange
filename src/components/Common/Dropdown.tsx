import React, { useId } from "react";

type Value = string | number;

type Option = {
  label: string;
  value: Value;
};

interface DropdownProps {
  label: string;
  options: Option[];
  value: Value;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onSelect }) => {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={`${id}-dropdown`}>{label}</label>
      <select
        id={`${id}-dropdown`}
        value={value}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
