import React, { useState } from 'react';
import './Form.css';
import FormSignUp from './FormSignUp';
import FormVerified from './FormVerified';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='Student-final.png' alt='Study' />
        </div>
        {!isSubmitted ? (
          <FormSignUp submitForm={submitForm} />
        ) : (
          <FormVerified/>
        )}
      </div>
    </>
  );
};

export default Form;