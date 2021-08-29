import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';
import pixabayApi from './services/PixabayApi';

class App extends Component {
  state = {
    value: '',
    page: 1,
    per_page: 12,
  };
  componentDidUpdate(prevState, prevProps) {
    if (prevState.value !== this.state.value) {
      pixabayApi(this.state);
    }
  }
  onSubmitHandler = data => {
    this.setState({ value: data });
  };
  render() {
    return <Searchbar onSubmit={this.onSubmitHandler} />;
  }
}

export default App;
