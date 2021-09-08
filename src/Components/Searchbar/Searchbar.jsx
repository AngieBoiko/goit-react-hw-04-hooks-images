import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handlerInput = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };
  const handlerSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return toast.error('Please, enter search query!');
    }
    onSubmit(value);
    setValue({ value: '' });
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handlerSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handlerInput}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
