import React from "react";
import "./style.css";

export  const UseState = () =>{ // manage the state and change the state of data
  // const initialData = 15;
  // const [myNum,setMyNum] = React.useState(initialData) // useState are returns of array of two elemnts
  const [myNum,setMyNum] = React.useState(0)

  // console.log(myNum);


    return (
        <>
        <div className="center_div">
          <p>{myNum}</p>
          <div class="button2" onClick = {()=>setMyNum(myNum+1)}>
          {/* // ek button ko click krne pr ek baar hi call hoga jb bhi cursor incr pr le jaayenge to give value sw vo infinite time tk increase hoti rhegi */}

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div class="button2" onClick = {()=> (myNum>0 ? setMyNum(myNum-1) : setMyNum(0))}>
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
export default UseState;
