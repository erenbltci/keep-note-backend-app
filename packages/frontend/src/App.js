import { useState } from 'react';
import AddNote from './components/AddNote';

import './App.scss'
import Notes from './components/ShowNote';

function App() {

  const [page, setPage] = useState('addNote')


  return (
    <div className='container'>


      <div className='tab'>
        <div className='tab-box'>
          <button className='tab-button' onClick={() => setPage('addNote')}>Add Note</button>
          <button className='tab-button' onClick={() => setPage('showNote')}>My Note</button>

        </div>
      </div>

      <hr />

      {page === 'addNote' ? <AddNote /> : <Notes />}


    </div>

  );

}

export default App;
