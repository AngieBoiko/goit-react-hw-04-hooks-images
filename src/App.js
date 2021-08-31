import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    value: '',
  };

  onSubmitHandler = data => {
    this.setState({ value: data });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
        <ImageGallery searchQuery={value} />

        <ToastContainer />
      </>
    );
  }
}

export default App;
