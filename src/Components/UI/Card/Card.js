import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius:0.5rem;
  background: white;
  margin: 0 auto;
`;

const Card = (props) => {
  return (
    <Wrapper className={props.className}>
      {props.children}
    </Wrapper>
  )
}

export default Card