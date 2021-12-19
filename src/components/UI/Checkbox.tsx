import React from 'react';
interface CheckBoxProps {
  name: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({
  name,
  label,
  isChecked,
  onChange,
}: CheckBoxProps): React.ReactElement => {
  return (
    <span>
      <input
        type="checkbox"
        name={name}
        id={`checkbox_${name}`}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={`checkbox_${name}`}>{label}</label>
    </span>
  );
};

export default Checkbox;
