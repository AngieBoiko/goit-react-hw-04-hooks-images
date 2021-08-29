import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    value: '',
  };

  onSubmitHandler = data => {
    this.setState({ value: data });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
        <ImageGallery value={this.state.value} />
        <ToastContainer />
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </>
    );
  }
}

export default App;
