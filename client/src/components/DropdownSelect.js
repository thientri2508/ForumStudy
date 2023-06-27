import React, { useState } from 'react';
import Select from 'react-select';

const DropdownSelect = ({options, onChange }) => {
  const defaultValue = options[0];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ddd' : 'transparent',
      color: state.isFocused ? '#333' : '#666',
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
    }),
  };

  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption ? selectedOption.value : ''); // Gọi callback function truyền giá trị lên thành phần cha
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      styles={customStyles}
      className='DropdownSelect'
      placeholder='Select Topic...'
    />
  );
};

export default DropdownSelect;
