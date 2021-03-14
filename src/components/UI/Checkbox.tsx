import React from 'react';

interface CheckBoxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckBoxProps> = (props): React.ReactElement => {
  return (
    <span>
      <input
        type="checkbox"
        name={props.name}
        id={`${props.name}-id`}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={`${props.name}-id`}>{props.label}</label>
    </span>
  );
};

export default Checkbox;
