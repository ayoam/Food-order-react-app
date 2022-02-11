import React, { useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { UilShoppingBag } from '@iconscout/react-unicons'

const Wrapper = styled.button`
  background-color:rgb(83, 12, 12);
  color:white;
  outline:none;
  border:none;
  padding: 10px 30px;
  border-radius:1.3rem;
  font-weight:bold;
  cursor:pointer;

  
  & span{
    background: rgb(151, 21, 21);
    padding: 3px 10px;
    border-radius:0.5rem;
    margin-left:5px ;
  }

  & .shopping-cart-icon{
    margin-right:5px ;
  }

  &:disabled,
  &[disabled]{
    background-color: grey;
  }
`;

const Button = React.forwardRef((props,Ref) => {
  const ButtonRef = useRef();
  const ButtonClickTrigger= ()=>{
    ButtonRef.current.click();
  }
  useImperativeHandle(Ref,()=>{
    return{
      click: ButtonClickTrigger
    }
  })
  return (
    <Wrapper onClick={props.onClick} disabled={props.disabled} ref={ButtonRef}>
      {props.cartButton && <UilShoppingBag size="13" className="shopping-cart-icon"/>}
      {props.text}
      {props.cartButton && <span>{props.cartButton.itemCount}</span>}
    </Wrapper>
  )
});

export default Button