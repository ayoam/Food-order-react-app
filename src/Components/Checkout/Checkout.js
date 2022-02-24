import React, { useContext, useState } from 'react'
import classes from '../Checkout/Checkout.module.css'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import useInput from '../../Hooks/use-input'
import { MealsContext } from '../../store/Meals-context'


const Checkout = (props) => {
  // const [orderConfirmed,SetOrderConfirmed] = useState(false);
  const {CartItems,SetCartItems} = useContext(MealsContext);

  const CheckoutBtnClickHandler= async(e)=>{
    e.preventDefault();
    const order= {
      'first-name':enteredFirstName,
      'last-name':enteredlastName,
      'email':enteredemail,
      'adresse':enteredadresse,
      'city':enteredcity,
      'phone-number':enteredphoneNumber,
      'order':CartItems
    };

    const response = await fetch("https://react-workspace-27f57-default-rtdb.firebaseio.com/Orders.json",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(order)
      }
    )
    const data = await response.json();
    props.onSaveCheckOrderHandler();
    SetCartItems([]);
  }

  const {value:enteredFirstName,
    hasError:firstNameHasError,
    inputChangeHandler:firstNameChangeHandler,
    inputBlurHandler:firstNameBlurHandler} = useInput((enteredFirstName)=>{
      return enteredFirstName.trim()!=='';
    });

    const {value:enteredlastName,
      hasError:lastNameHasError,
      inputChangeHandler:lastNameChangeHandler,
      inputBlurHandler:lastNameBlurHandler} = useInput((enteredLastName)=>{
        return enteredLastName.trim()!=='';
    });

    const {value:enteredemail,
      hasError:emailHasError,
      inputChangeHandler:emailChangeHandler,
      inputBlurHandler:emailBlurHandler} = useInput((enteredEmail)=>{
        return enteredEmail.trim()!=='';
    });

    const {value:enteredadresse,
      hasError:adresseHasError,
      inputChangeHandler:adresseChangeHandler,
      inputBlurHandler:adresseBlurHandler} = useInput((enteredAdresse)=>{
        return enteredAdresse.trim()!=='';
    });

    const {value:enteredcity,
      hasError:cityHasError,
      inputChangeHandler:cityChangeHandler,
      inputBlurHandler:cityBlurHandler} = useInput((enteredCity)=>{
        return enteredCity.trim()!=='';
    });

    const {value:enteredphoneNumber,
      hasError:phoneNumberHasError,
      inputChangeHandler:phoneNumberChangeHandler,
      inputBlurHandler:phoneNumberBlurHandler} = useInput((enteredPhoneNumber)=>{
        return enteredPhoneNumber.trim()!=='';
    });

    const firstNameIsValid = !firstNameHasError && enteredFirstName!=='';
    const lastNameIsValid = !lastNameHasError && enteredlastName!=='';
    const emailIsValid = !emailHasError && enteredemail!=='';
    const adresseIsValid = !adresseHasError && enteredadresse!=='';
    const cityIsValid = !cityHasError && enteredcity!=='';
    const phoneNumberIsValid = !phoneNumberHasError && enteredphoneNumber!=='';

    const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid && adresseIsValid && cityIsValid && phoneNumberIsValid

  return (
    <Card className={classes.card}>
      <form className={classes.form}>
        <div className={classes.inputGroup}>
          <label className={classes.label}>First name</label>
          <input type="text"
           className={firstNameHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredFirstName}
           onChange={firstNameChangeHandler}
           onBlur={firstNameBlurHandler}/>
          {firstNameHasError && <p className={classes.errorMessage}>First name invalid</p>}
        </div>

        <div className={classes.inputGroup}>
          <label className={classes.label}>Last name</label>
          <input type="text" 
           className={lastNameHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredlastName}
           onChange={lastNameChangeHandler}
           onBlur={lastNameBlurHandler}/>
          {lastNameHasError &&<p className={classes.errorMessage}>Last name invalid</p>}
        </div>

        <div className={classes.inputGroup}>
          <label className={classes.label}>Email</label>
          <input type="text" 
           className={emailHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredemail}
           onChange={emailChangeHandler}
           onBlur={emailBlurHandler}/>
          {emailHasError &&<p className={classes.errorMessage}>Email invalid</p>}
        </div>
        
        <div className={classes.inputGroup}>
          <label className={classes.label}>Adresse</label>
          <input type="text" 
           className={adresseHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredadresse}
           onChange={adresseChangeHandler}
           onBlur={adresseBlurHandler}/>
          {adresseHasError &&<p className={classes.errorMessage}>Adresse invalid</p>}
        </div>

        <div className={classes.inputGroup}>
          <label className={classes.label}>City</label>
          <input type="text" 
           className={cityHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredcity}
           onChange={cityChangeHandler}
           onBlur={cityBlurHandler}/>
          {cityHasError &&<p className={classes.errorMessage}>City invalid</p>}
        </div>

        <div className={classes.inputGroup}>
          <label className={classes.label}>Phone number</label>
          <input type="text" 
           className={phoneNumberHasError?[classes.input,classes.inputError].join(' '):classes.input}
           value={enteredphoneNumber}
           onChange={phoneNumberChangeHandler}
           onBlur={phoneNumberBlurHandler}/>
          {phoneNumberHasError &&<p className={classes.errorMessage}>Phone number invalid</p>}
        </div>

        <div className={classes.inputGroup} style={{textAlign:'center'}}>
          <Button text="Confirm order" onClick={CheckoutBtnClickHandler} disabled={!formIsValid}/>
        </div>
      </form>
    </Card>
  )
}

export default Checkout