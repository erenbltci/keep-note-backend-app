
import React, { useState, useEffect } from 'react'

import './index.scss'

const AddNote = (props) => {

  const [title, setTitle] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    localStorage.setItem("last-text-info", JSON.stringify({ title, text }));
  }, [title, text]);

  return (
    <div className='container'>
      <input type="text" placeholder='> Title Ex. mycode' onChange={(e) => setTitle(e.target.value)}></input>
      <textarea
        placeholder="> Write something..."
        id="textarea"
        name="textarea"
        title="Text Area"
        required
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button className='saveButton'>Save</button>

    </div>
    
  )
}

export default AddNote
