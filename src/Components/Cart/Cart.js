import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import CartItem from '../CartItem/CartItem.js';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import { MealsContext } from '../../store/Meals-context';
import { v4 as generateKey } from 'uuid';

const ModalCart = styled.div`
  display: ${props=>props.show?'block':'none'};
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  top:0;
  left: 0;

  & .modal-card{
    display:block;
    position:absolute;
    background: white;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:550px;
    border-radius:0.5rem;
    box-shadow:1px 1px 12px 1px rgba(0,0,0,0.1);
    overflow:hidden;
    padding-bottom:10px;
    z-index:1000;
  }

  & .modal-header{
    background: rgb(137, 42, 182);
    box-sizing:border-box;
    padding: 15px;
    color:white;
    font-weight:bold;
    font-size:1.1rem;
  }

  & .modal-header .modal-header__title{
    padding: 0;
    margin: 0;
  }

  & .modal-body{
    padding: 15px;
  }

  & .modal-footer{
    padding: 15px;
  }

  & .modal-footer Button{
    float:right;
  }

  & .modal-footer Button:nth-child(2){
    float:right;
    background: white;
    color:rgb(83, 12, 12);
    border:1px solid rgb(83, 12, 12);
    margin-right:5px;
  }

  & .modal-body__CartItems{
    /* background: red; */
    margin: 0;
    padding: 0;
  }

  & .modal-body__CartTotal{
    display:flex;
    justify-content:space-between;
    border-top:2px solid black;
    margin-top:10px;
  }

  & .modal-body__CartTotal p{
    margin:5px;
    font-weight:bold;
    font-size:1.2rem;
    
  }
`;

const Cart = (props) => {
  const {CartItems,MealsList,SetCartItems} = useContext(MealsContext);

  const CalculateTotal= ()=>{
    const mealTotal = CartItems.map(item=>{
      const MealItem = MealsList.find(elt=>elt.id===item.id);
      return item.quantity*MealItem.price;
    })
    return mealTotal.length?mealTotal.reduce((accu,value)=>accu+value).toFixed(2):(0).toFixed(2);
  }

  const closeBtnRef = useRef();

  const orderBtnClickHandler = ()=>{
    props.onSetIsOrdered(true);
    closeBtnRef.current.click();
    SetCartItems([]);
  }

  return (
    <ModalCart show={props.show}>
      <Card>
          <div className="modal-card">
            <div className="modal-body">
              <ul className="modal-body__CartItems">
                {!CartItems.length && <p style={{textAlign:'center',fontStyle:'italic'}}>the cart is empty</p>}
                {CartItems.map(item=>{
                  const MealItem = MealsList.find(elt=>elt.id===item.id);
                  return <CartItem key={generateKey()} id={item.id} title={MealItem.title} price={MealItem.price} quantity={item.quantity}/>
                })}
              </ul>
              <div className="modal-body__CartTotal">
                <p>Total Amount</p>
                <p>${CalculateTotal()}</p>
              </div>
            </div>
            <div className="modal-footer">
                <Button text="Order" onClick={orderBtnClickHandler}/>
                <Button text="Close" ref={closeBtnRef} onClick={()=>props.onSetShowCart(false)}/>
            </div>
        </div>
      </Card>
    </ModalCart>
  )
}

export default Cart




