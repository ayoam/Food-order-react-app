import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color:white;
  text-align: center;
  margin-top: 50px;
`;

const OrderComplete = () => {
  return (
    <Wrapper>
      <h1>Thank you for your order ! 🥳</h1>
    </Wrapper>
  )
}

export default OrderComplete