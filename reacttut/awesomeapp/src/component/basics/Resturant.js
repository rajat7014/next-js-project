import React, { useState } from "react"
import "./Style.css"
import Menu from "../menuApi";
import MenuCard from "./menuCard";
import Navbar from "./Navbar";




const uniqueList = [
    ...new Set(
        Menu.map((curElem)=>{
    return curElem.category; 
})
),
"All",
];
console.log(uniqueList);


const Resturant = () =>{
    // const myStyle = {color: "red"}; inlie css and its object in js 
    // the my =Style object are put into the span tag with the curlybraces{}



    // data k management k lilye useState method use krte h
    // it is HOOKS
    
    const [menuData , setMenuData] = useState(Menu) // useState it returns arrays of two element
    const [menuList,setMenuList] = useState(uniqueList)
   const filterItem = (category) =>{
    if(category === "All"){
        setMenuData(Menu);
        return;
    }
    const updatedList = Menu.filter((curElem) =>{
        return curElem.category === category;
    });
    setMenuData(updatedList);
   };
    

    return(
        <>
       <Navbar filterItem={filterItem} menuList = {menuList}/>
       <MenuCard menuData = {menuData}/> 
         </>
                 // <MenuCard MenuData = {MenuData}/>  this is PROPS and it is use as a loop
    );
};

export default Resturant