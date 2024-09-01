import React from "react";

const App = () =>{ // fat arrow function 
  return ( // return jsx html tag element is a jsx 
//also used react.fragement and <></> tag for mulltiple lement of jsx
// use arrray block and  section tag for multiple use of jsx
// but div tag is always return a sigle element of jsx
<>
<MyName></MyName> 

<MyName/> 
    <h1 className="myclassname">hello world {3+3}</h1>
    <p> here i am rajat </p>
    <img src="" alt=""></img>
</>
// rule of jsx is say that all gtml tag are use with closing tag
  );
};



const MyName = () =>{ // here we can create our new html tag and use call the function from this method <myName/>
  return (
    <>
  <h1> rajat yadav </h1>
  <p> how are you</p>
  </>
);
};



// how react is actually loocking into it

// const App = () => {
//   return React.createElement("h1",{},"thapa technical");
// };

export default App; // import from the index.js file









// all code contemt are app.js file