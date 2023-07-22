import React from 'react';
import "./AddNewLink.css";

export default function AddNewLink({ click }) {
  return (
    <button className='add-new-link__btn' type='button' onClick={click}>+ Add new link</button>
  )
}
