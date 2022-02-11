import React ,{ useContext, useReducer} from 'react'
import styled from 'styled-components';
import Button from '../UI/Button/Button';
import { MealsContext } from '../../store/Meals-context';

const Item = styled.li`
  list-style:none;
  background: whitesmoke;
  margin-bottom:10px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding: 10px 5px;

  &>.Item__info>p{
    margin:0;
    padding:0;
  }

  &>.Item__info>p:nth-child(1){
    font-weight:bold;
  }

  &>.Item__info>p:nth-child(2){
    font-size:0.9rem;
    font-style:italic;
  }

  &>.Item__info>p:nth-child(3){
    font-weight:bold;
    color:rgb(194, 126, 0);
  }

  & .Item__actions__inputContainer{
    margin-bottom:5px;
  }

  & .Item__actions__inputContainer>input{
    width: 30px;
    margin-left:5px;
    border-radius:0.2rem;
    border:1px solid rgba(0,0,0,0.5);
    outline:none;
  }

  & .Item__actions__inputContainer .invalidInput{
    outline:none;
    background-color: rgba(255,0,0,0.3);
    border:1px solid rgb(255,0,0);
  }

  & .Item__actions>Button{
    padding-top:5px;
    padding-bottom:5px;
  }

 
`;

const MealItem = (props) => {
  const {SetCartItems} = useContext(MealsContext);
  // const [quantity,SetQuantity] = useState('');
  const quantityReducer= (state,action)=>{
    if(action.type==='INPUT_CHANGE'){
      return {value:parseInt(action.value) || action.value, isValid:parseInt(action.value)>0 || false};
    }else if(action.type==='INPUT_BLUR'){
      return {value:state.value , isValid: state.isValid};
    }
    else{
      return state;
    }
  }

  const [qualtityState,quantityDispatcher] = useReducer(quantityReducer,{value:1,isValid:true});

  const addBtnClickHandler= ()=>{
    SetCartItems(prevState=>{
      const index = prevState.findIndex(item=>item.id===props.MealData.id);
      if(index!==-1){
        prevState[index].qualtity+=qualtityState.value
      }else{
        prevState.unshift({
          id:props.MealData.id,
          quantity:qualtityState.value
        })
      }
      return[
        ...prevState 
      ]
    })
  }

  return (
    <Item>
      <div className='Item__info'>
        <p>{props.MealData.title}</p>
        <p>{props.MealData.description}</p>
        <p>${props.MealData.price}</p>
      </div>
      <div className='Item__actions'>
        <div className="Item__actions__inputContainer">
          <label>Amount</label>
          <input type="number" min="1" className={qualtityState.isValid?'':'invalidInput'} value={qualtityState.value}
           onChange={(e)=>quantityDispatcher({type:"INPUT_CHANGE",value:e.target.value})}
           onBlur={(e)=>quantityDispatcher({type:"INPUT_BLUR"})}
           />
        </div>
        <Button className="item__AddBtn" text="Add" onClick={addBtnClickHandler} disabled={!qualtityState.isValid}/>
      </div>
    </Item>
  )
}

export default MealItem