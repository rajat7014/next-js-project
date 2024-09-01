import React, { useReducer } from "react";
import "./style.css";

const reducer = (state,action) =>{
    if(action.type === "INCR"){
        state = state+1;
    }
    if(state > 0 && action.type === "DECR"){
        state  = state-1;
    }
    return state;
}

export  const UseReducer = () =>{ // manage the state and change the state of data
  // const initialData = 15;
  // const [myNum,setMyNum] = React.useState(initialData) // useState are returns of array of two elemnts
//   const [myNum,setMyNum] = React.useState(0)

const initialData = 10;
const [state,dispatch] = useReducer(reducer,initialData);

// it access the two data reducer data and intial data
// useReducer are work as same for useState 
// but it use for complex state and state manupulation and complex logic

  // console.log(myNum);


    return (
        <>
        <div className="center_div">
          <p>{state}</p>
          <div class="button2" onClick = {()=>dispatch({type:"INCR"})}>
          {/* // ek button ko click krne pr ek baar hi call hoga jb bhi cursor incr pr le jaayenge to give value sw vo infinite time tk increase hoti rhegi */}

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div class="button2" onClick = {()=>dispatch({type:"DECR"})}>
        {/* // ek button ko click krne pr ek baar hi call hoga jb bhi cursor decr pr le jaayenge to give value se DECR hoti rhegi 0 tk  */}
        <span></span>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
        </div>
        </>
    )
}
export default UseReducer;
