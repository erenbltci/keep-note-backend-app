import { useState } from 'react';

import AddNote from './components/AddNote';
import './App.scss'
import Notes from './components/ShowNote';
import Navbar from './components/NavBar';

function App() {
  const [page, setPage] = useState('addNote');

  return (
    <>
      <Navbar />

    </>
  );

}

export default App;
