import React, { useState } from 'react';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [value, setValue] = useState('');

  const onSubmitHandler = data => {
    setValue(data);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitHandler} />
      <ImageGallery searchQuery={value} />
      <ToastContainer />
    </>
  );
}
