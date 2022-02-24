import React,{ useState } from 'react'

const useInput = (validateInput) => {
  const [enteredInput,setEnteredInput] = useState('');
  const [isTouched,setIsTouched] = useState(false);

  const inputIsValid = validateInput(enteredInput);
  const hasError = !inputIsValid && isTouched;

  const inputChangeHandler= (e)=>{
    setEnteredInput(e.target.value);
  }

  const inputBlurHandler= (e)=>{
    setIsTouched(true);
  }

  return {
    value:enteredInput,
    hasError,
    inputChangeHandler,
    inputBlurHandler
  }
}

export default useInput