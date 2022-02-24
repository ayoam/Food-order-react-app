import './styles/App.css';
import Button from './Components/UI/Button/Button.js';
import ReactDOM from "react-dom";
import styled from "styled-components";
import Meals from "./Components/Meals/Meals.js";
import  Cart from "./Components/Cart/Cart.js"
import { useEffect, useState } from 'react';
import { MealsContext } from './store/Meals-context';
import OrderComplete from './Components/OrderComplete/OrderComplete.js';
import Checkout from './Components/Checkout/Checkout';

const Header = styled.div`
  background-color:brown;
  padding:0;
  margin:0;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  height:60px;
  box-sizing:border-box;
  padding:0 80px;

  &>p{
    padding: 0;
    margin: 0;
    font-size:1.5rem;
    font-weight:bold;
    color:white;
  }

`;




function App() {

  const [MealsList,SetMealsList] = useState([]);
  const [error,SetError]= useState(null);
  const [isLoading,SetIsLoading] = useState(false);

  const fetchMealsList= async()=>{
    try{
      SetIsLoading(true);
      const response = await fetch("https://react-workspace-27f57-default-rtdb.firebaseio.com/Meals.json");
      const data = await response.json();
      if(data == null){
        throw new Error("something went wrong");
      }
      const meals = []
      for(let key in data){
        meals.push({id:key,...data[key]});
      }
      SetMealsList(meals);
    }
    catch(error){
      SetError(error.message);
    }
    SetIsLoading(false);
  }

  useEffect(()=>{
    fetchMealsList();
  },[]);

  // const [MealsList,SetMealsList] = useState([
  //   {
  //     id:'m1',
  //     title:'Suchi',
  //     description:'Finest fish and veggies',
  //     price:22.99,
  //   },
  //   {
  //     id:'m2',
  //     title:'Schnitzel',
  //     description:'A german speciality!',
  //     price:16.50,
  //   },
  //   {
  //     id:'m3',
  //     title:'Barbecue Burger',
  //     description:'American, Raw,meaty',
  //     price:12.99,
  //   },
  //   {
  //     id:'m4',
  //     title:'Green bowl',
  //     description:'Healty...and green...',
  //     price:18.99,
  //   }
  // ]);
  
  const [CartItems,SetCartItems] = useState([
    // {
    //   id:"m4",
    //   quantity:1,
    // }
  ]);
  

  const [showCart,SetShowCart] = useState(false);
  const [isOrdered,SetIsOrdered] = useState(false);
  const [orderIsConfirmed,SetOrderIsConfirmed] = useState(false);

  const cartCount = ()=>{
    let count = 0;
    CartItems.forEach(elt=>{
      count+= elt.quantity;
    })
    return count;
  }

  const cartBtnClickHandler= ()=>{
    SetShowCart(true);
  }

  const CheckOrderHandler= ()=>{
    SetOrderIsConfirmed(true);
  }

  return (
    <MealsContext.Provider value={{CartItems,MealsList,SetCartItems,SetMealsList,error,isLoading}}>
      {ReactDOM.createPortal(
        <Header>
          <p>ReactMeals</p>
          <Button text="Your Cart" cartButton={{itemCount:cartCount()}} onClick={cartBtnClickHandler}/>
          <Cart show={showCart} onSetShowCart={SetShowCart} onSetIsOrdered={SetIsOrdered}/>
        </Header>
        ,document.getElementById('header-root')
      )}
      {(!orderIsConfirmed && isOrdered) && <Checkout onSaveCheckOrderHandler={CheckOrderHandler}/>}
      {!isOrdered && <Meals MealsList={MealsList}/>}
      {orderIsConfirmed && <OrderComplete/>}
    </MealsContext.Provider>
    );
}

export default App;
