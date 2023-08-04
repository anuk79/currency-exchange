import React from "react";

interface RadioProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ value, label, checked, onChange }) => (
  <div>
    <label>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      {label}
    </label>
  </div>
);

export default Radio;
