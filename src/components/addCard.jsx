import { useState } from "react";

const AddCard=(props)=>{
    
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const handleAddNote=(event)=>{
        //the below line is for preventing refresh
        event.preventDefault();
        if(title.trim() !== ''){
            props.handleAddNote({
                title : title,
                desc : desc
            });
            setTitle('');
            setDesc('');
        }
    }

    const HandleTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const HandleDescChange = (event)=>{
        setDesc(event.target.value)
    }

    return(
        <div className="note-card flex flex-col justify-evenly align-top" id="add-note-card">
            <form className="form flex flex-col " onSubmit={handleAddNote}>
                <h2 className="text-white  font-bold text-xl p-3 text-center">New Note</h2>
                {/* <label className="text-white text-shadow-lg text-xl font-bold">Title:</label> */}
                <input type="text" placeholder="Enter Title" 
                    className="bg-white shadow-md text-shadow-lg outline-white border-2 rounded text-center p-2 mt-2 h-9.5 border-white"
                    value={title}
                    onChange={HandleTitleChange}/>
                {/* <label className="text-white text-l text-shadow-md font-extrabold mt-2 -mb-4 ">Description:</label> */}
                <br/>
                <textarea placeholder="Enter the Description"
                    className="bg-white shadow-md text-shadow-lg
                     outline-white border-2 rounded text-center p-2 h-11.5 -mt-2.5 border-white" 
                    value={desc}
                    onChange={HandleDescChange}></textarea>

                <div className="flex justify-center pt-2 ">
                    <button type="submit" 
                className="button shadow" id="add-button" >Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCard;