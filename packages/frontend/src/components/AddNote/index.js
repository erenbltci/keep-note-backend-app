

import React, { useState, useEffect } from 'react'

import './index.scss'

const AddNote = (props) => {


  const [ title, setTitle ] = useState(undefined)
  const [ text, setText ] = useState(undefined)


  useEffect(() => {
    // storing input name
    localStorage.setItem("last-text-info", JSON.stringify({title, text}));
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

      <button className='save-button'>Save</button>

    </div>
  )
}

export default AddNote
