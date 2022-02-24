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
  const {MealsList,error,isLoading} = useContext(MealsContext);
  return (
    <Wrapper>
      <Card className="Card">
        {error!=null?<p style={{textAlign:'center'}}>{error}</p>:""}
        {(isLoading && error==null)?<p style={{textAlign:'center'}}>Loading...</p>:MealsList.map(item=><MealItem key={generateKey()} MealData={item}/>)}
      </Card>
    </Wrapper>
  )
}

export default Meals;