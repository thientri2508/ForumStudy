import React, { useState } from 'react';
import Select from 'react-select';

const SortBy = () => {
  const options = [
    { value: '1', label: 'Recent Activity' },
    { value: '2', label: 'Newest' },
    { value: '3', label: 'Most Comments' },
    { value: '4', label: 'Most Views' },
    { value: '5', label: 'Most Reactions' }
  ];
  
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
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      styles={customStyles}
      className='DropdownSelect'
    />
  );
};

export default SortBy;
