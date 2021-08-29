import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';

class App extends Component {
  state = {
    value: '',
  };
  onSubmitHandler = data => {
    this.setState({ value: data });
  };
  render() {
    return <Searchbar onSubmit={this.onSubmitHandler} />;
  }
}

export default App;
