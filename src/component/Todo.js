import React, { useState , useEffect } from 'react'
import './style.css'

// getting data from localstorage 
const getLocalData = () =>{
    const list = localStorage.getItem("myLocalStorage");
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalData());
    const [isEdit,setIsEdit] = useState("");
    const [toggleButton,setToggleButton] = useState(false);

    // add item 
    const addItem = () => {
        if (!inputData) {
            alert("Plz fill some data")
        }else if(inputData && toggleButton) {
            setItem(
                item.map((currEle) =>{
                    if(currEle.id === isEdit){
                        return{...currEle,name:inputData}
                    }
                    else{
                        return currEle
                    }
                })
            )
            setInputData("");
            setIsEdit(null);
            setToggleButton(false);
        }
        else {
            const nameInputData = {
                id: new Date().getTime().toString(),
                name:inputData
            }
            setItem([...item, nameInputData])
            setInputData("");
        }
    }
    // Edit the Items
    const editItem = (index) =>{
        const edit_Item = item.find((curEle) =>{
            return curEle.id === index;
        })
        setInputData(edit_Item.name);
        setIsEdit(index);
        setToggleButton(true);
    }
    // delete item 
    const deleteItem = (index) => {
        const updateItems = item.filter((curEle) => {
            return curEle.id !== index;
        })
        setItem(updateItems);
    }
// remove all item 
const removeAll = () =>{
    setItem([]);
}

// addding data on localstorage 
useEffect(()=>{
    localStorage.setItem("myLocalStorage",JSON.stringify(item));
},[item])
    return (
        <div className="Container">
            <div className="section-top">
                <h3>To Do App</h3>
                <img src="/img/write-note.png" alt />
            </div>
            {/* Add Item */}
            <div className="section-middle">
                <input type="text" placeholder="✍ Add Item Here" value={inputData} onChange={(e) => setInputData(e.target.value)} />
                {
                 toggleButton ?  <i class="fas fa-edit edit1" onClick={addItem}></i> : <i class="fas fa-plus" onClick={addItem}></i>  
                }
            </div>
            {/* Item List */}
            <div className="itemList">
                {
                    item.map((currEle) => {
                        return (
                            <div className="items" key={currEle.id}>
                                <h3>{currEle.name}</h3>
                                <div className="action">
                                    <i class="fas fa-edit" onClick={() => editItem(currEle.id)}></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i class="fas fa-trash-alt" onClick={() => deleteItem(currEle.id)}></i>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            {/* Button to Add Items */}
            <div>
                <button class="glow-on-hover" type="button" onClick={removeAll}>Remove All</button>
            </div>
        </div>
    )
}

export default Todo
