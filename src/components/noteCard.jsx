import { useState } from "react";

function NoteCard(props){
    const[isEditing, setIsEditing]=useState(false);
    const [editedTitle,setEditedTitle] = useState(props.title);
    const [editedDesc,setEditedDesc] = useState(props.desc);

    const handleSave = ()=>{
        props.onEdit(editedTitle,editedDesc);
        setIsEditing(false);
    };

    const handleCancel = ()=>{
        setEditedTitle(props.title);
        setEditedDesc(props.desc);
        setIsEditing(false);
    };

    return(
        <div className="note-card border-teal-600  flex flex-col justify-evenly align-top border-3 w-64">
           {
            isEditing ? (
                <>
                    <h2 className="font-bold text-xl p-3 text-center edit-card-heading">Edit Note</h2>
                    <input type="text" value={editedTitle} onChange={(event)=>setEditedTitle(event.target.value)}
                    className="mb-2 p-2 rounded outline-gray-300 border-2 border-gray-300"/>

                    <textarea value={editedDesc} onChange={(event)=>{setEditedDesc(event.target.value)}}
                        className="mb-2 p-2 rounded border-2 border-gray-300 outline-gray-300"/>
                    
                    <div className="flex justify-center space-x-2">
                        <button className="button" onClick={handleSave}>Save</button>
                        <button className="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="title font-bold text-xl p-3 text-center truncate">{props.title}</h2>
                    <p className="desc text-center overflow-y-auto overflow-x-auto">{props.desc}</p>
                    <div className="flex justify-center space-x-2 mt-4">
                        <button className="button" onClick={()=> setIsEditing(true)}>Edit</button>
                        <button className="button" onClick={props.onDelete}>Delete</button>
                    </div>
                </>
            )}
            
        </div>
    );
}

export default NoteCard;