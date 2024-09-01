import React, { useEffect } from "react";
import "./style.css";

const UseEffect= () =>{ // manage the state and change the state of data
  // const initialData = 15;
  const [myNum,setMyNum] = React.useState(0) // useState are returns of array of two elemnts

  useEffect(()=>{
// console.log("hello");
document.title = `Chats(${myNum})`;
});
  // },[]); // array block are used in useeffect
  // if array block are used then you can only first time refreshing see output
// use effect are used to call the function when the page is refreshed
// and you can see our website only one time any title statement that is possible for useEffect

    return (
        <>
        <div className="center_div">
          <p>{myNum}</p>
          <div className="button2" onClick = {()=>setMyNum(myNum+1)}>
          {/* // ek button ko click krne pr ek baar hi call hoga jb bhi cursor incr pr le jaayenge to give value sw vo infinite time tk increase hoti rhegi */}

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        </div>
    
        </>
    )
}
export default UseEffect;