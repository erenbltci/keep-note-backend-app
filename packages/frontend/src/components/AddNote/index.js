

import React from 'react'

import './index.scss'

const AddNote = (props) => {

  return (
    <div className='container'>
      <input type="text" placeholder='> Title Ex. mycode'></input>
      <textarea
        placeholder="> Write something..."
        id="textarea"
        name="textarea"
        title="Text Area"
        required
      ></textarea>

      <button className='save-button'>Save</button>

    </div>
  )
}

export default AddNote
