
import './App.scss'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/NavBar';
import HomePage from './pages/Home';
import NotesPage from './pages/MyNotes';

function App() {
  return (<>
    <Navbar />

    <Routes>
      <Route path='/' element={< HomePage />} />
      <Route path='/mynotes' element={< NotesPage />} />
    </Routes>
  </>
  );

}

export default App;
