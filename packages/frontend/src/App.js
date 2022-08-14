import { useState } from 'react';
import AddNote from './components/AddNote';

import './App.scss'
import Notes from './components/ShowProfile';

function App() {

  const [page, setPage] = useState('addNote')


  return (
    <div className='container'>


      <div className='tab'>
        <div className='tab-box'>
          <button className='tab-button' onClick={() => setPage('addNote')}>Note</button>
          <button className='tab-button' onClick={() => setPage('showNote')}>Profile</button>

        </div>
      </div>

      <hr />

      {page === 'addNote' ? <AddNote /> : <Notes />}


    </div>

  );

}

export default App;
