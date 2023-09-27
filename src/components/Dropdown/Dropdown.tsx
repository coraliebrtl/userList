import { useState } from "react";

interface DropdownProps {
  options: Array<string>;
  onChange: (option: string) => void;
}

const Dropdown = ({ options, onChange }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  onChange(selectedOption);

  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
