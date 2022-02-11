import React ,{ useContext }  from 'react'
import Card from '../UI/Card/Card';
import styled from 'styled-components';
import MealItem from '../MealItem/MealItem';
import { v4 as generateKey } from 'uuid';
import { MealsContext } from '../../store/Meals-context';

const Wrapper= styled.ul`
  & .Card{
    width:600px;
    margin-top:30px ;
    padding: 20px;
  }
`;

const Meals = (props) => {
  const {MealsList} = useContext(MealsContext);
  return (
    <Wrapper>
      <Card className="Card">
        {
          MealsList.map(item=><MealItem key={generateKey()} MealData={item}/>)
        }
        
      </Card>
    </Wrapper>
  )
}

export default Meals