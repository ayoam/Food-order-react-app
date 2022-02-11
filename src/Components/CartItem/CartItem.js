import React, { useContext } from 'react'
import styled from 'styled-components'
import { MealsContext } from '../../store/Meals-context.js';

const Wrapper = styled.li`
  list-style:none;
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  background: whitesmoke;
  padding: 10px;
  margin-bottom:10px;

  & .Cart-item__info p{
    margin: 0;
    padding: 0;
    font-weight:bold;
    font-size:1.5rem;
    margin-bottom:10px;
  }

  & .Cart-item__info>div>p{
    font-size:0.9rem;
    color:rgb(83, 12, 12);  
    margin:0;
  }

  & .Cart-item__info>div{
    display: flex;
    flex-direction:row;
    justify-content:center;
  }

  & .Cart-item__info>div>span{
    border: 1px solid rgb(83, 12, 12);
    margin-left:20px;
    border-radius:0.3rem;
    padding:0 10px;
    font-weight:bold;
  }

  & .Cart-item__actions{
    display: flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
  }

  & .Cart-item__actions>button{
    padding: 5px 20px;
    outline: none;
    border: none;
    margin: 0 5px;
    border-radius:0.3rem;
    background: transparent;
    border: 1px solid rgb(83, 12, 12);
    cursor:pointer;
    font-weight:bold;
    color:rgb(83, 12, 12);
  }
`;

const CartItem = (props) => {
  const {SetCartItems} = useContext(MealsContext);
  const changeQuantityBtnClickHandler= (e)=>{
    SetCartItems(prevState=>{
      const index = prevState.findIndex(item=>item.id===props.id);
      if(e.target.textContent==='+'){
        prevState[index].quantity++;
      }else{
        prevState[index].quantity--;
        if(prevState[index].quantity<=0){
          prevState.splice(index,1);
        }
      }
      return[
        ...prevState 
      ]
    })
  }
  return (
    <Wrapper>
      <div className='Cart-item__info'>
        <p>{props.title}</p>
        <div>
          <p>${props.price}</p>
          <span>x {props.quantity}</span>
        </div>
      </div>
      <div className='Cart-item__actions'>
        <button className="minusBtn" onClick={changeQuantityBtnClickHandler}>-</button>
        <button className="plusBtn" onClick={changeQuantityBtnClickHandler}>+</button>
      </div>
    </Wrapper>
  )
}

export default CartItem