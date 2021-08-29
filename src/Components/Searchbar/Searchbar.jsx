import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    value: '',
  };
  handlerInput = e => {
    this.setState({ value: e.currentTarget.value });
  };
  handlerSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handlerSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handlerInput}
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
