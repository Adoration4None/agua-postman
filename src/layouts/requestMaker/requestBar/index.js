import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import React, { useState } from "react";
import styles from "./requestBar.module.css";
import Select from "react-select";

export default function RequestBar({ userInputCallback }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    userInputCallback(event.target.value);
  }

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const options = [
    { value: "GET",    label: "GET",    color: "green" },
    { value: "POST",   label: "POST",   color: "blue" },
    { value: "PUT",    label: "PUT",    color: "red" },
    { value: "DELETE", label: "DELETE", color: "purple" },
    { value: "PATCH",  label: "PATCH",  color: "orange" },
  ];

  const customStyles = {
    control: provided => ({
      ...provided, 
      background: 'var(--bg-color)', 
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      borderColor: 'var(--border-color)'}),
    option: (provided, state) => ({
      ...provided,  
      color: state.data.color,
      backgroundColor: state.isFocused ? 'var(--secondary-button-color)' : 'var(--bg-color)',
      border: "none",
      cursor: 'pointer'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      background: 'transparent',
      outline: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      background: 'var(--bg-color)'
    })
  };

  const getOptionLabel = (option) => (
    <div style={{ color: option.color }}>{option.label}</div>
  );

  return (
    <div className="container-fluid d-flex align-items-center">

      <label className={styles['label']}>
        <Select
            className={styles['select']}
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            styles={customStyles}
            getOptionLabel={getOptionLabel}
            placeholder={options[0].label}
          />

        <input
            className={styles['input']}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter or paste URL here"
          />

      </label>
      <span>
        <button type="button" style={{ fontSize: '13px', fontWeight: 'bold' }} className="btn btn-primary px-5 py-3">
            Send
        </button>
      </span>
      
      
    </div>
  );
}
