import React, { useState,useEffect } from "react";
import "./style.css"

// get the local storage data back

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

   

    const addItem = () => {
        if (!inputData) {
            alert("please fill the data");
        } 
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem,name:inputData}
                        }
                        return curElem;
                })
            )
            setInputData("")
    setEditItem(null);
    setToggleButton(false);
        }
        
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items,  myNewInputData]);
            setInputData('');
        }
    }

// edit the item

const editItem = (index) => {
    const item_todo_edited = items.find((curElem)=>{
        return curElem.id === index;
    });
    setInputData(item_todo_edited.name)
    setEditItem(index);
    setToggleButton(true);
}



    //  how to delete items section 
    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    //  code for chek list button remove all
     const removeAll = () => {
        setItems([]);
     };
     
     // edit local storage

     useEffect(()=>{
        localStorage.setItem("mytodoList", JSON.stringify(items));
     },[items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}

                        />
                        {toggleButton ?(
                            <i className="far fa-edit add-btn" onClick={addItem}> </i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}> </i>
                        )}
                        
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {
                            items.map((curElem,index) => {
                                return(
                                    <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                                <i className="far fa-edit add-btn"
                                 onClick={()=> editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                                )
                            })}
                        
                    </div>

                    {/* remove all button code */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                        onClick={removeAll}>
                            <span>CHEK LIST</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Todo;