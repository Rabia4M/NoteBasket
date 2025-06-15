import { useEffect, useState } from 'react'
import './App.css'
import NoteCard from './components/noteCard.jsx'
import AddCard from './components/addCard.jsx'
import searchIcon from './assets/search_icon.svg'
import menuIcon from './assets/menu_icon.svg'


const DEFAULT_NOTES=[
        { title: "Note1", desc: "Sample Description" },
        { title: "Note2", desc: "Sample Description" }
      ];


function App() {
  const [searchtext, setSearchText] = useState('');
  const [notes,setNotes] =useState(()=>{
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes):DEFAULT_NOTES;
  });
  


  //this use effect works on 1st rendering only
  useEffect(()=>{
    const storedNotes = localStorage.getItem("notes");
    if(storedNotes){
      setNotes(JSON.parse(storedNotes))
    }
    else{
      setNotes(DEFAULT_NOTES)
    }
  },[]);

  //this useeffect is for any chnage to notes
  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes])

  const handleAddNote=(newNote)=>{
    setNotes([newNote,...notes])
  }

  const handleEdit = (index,newTitle, newDesc)=>{
    const updatedNotes = [...notes];
    updatedNotes[index] = {title:newTitle ,desc: newDesc};
    setNotes(updatedNotes);
  }

  const handleDelete = (index)=>{
    const updatedNotes = notes.filter((_,i)=>i !== index);
    setNotes(updatedNotes)
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchtext.toLowerCase()) ||
    note.desc.toLowerCase().includes(searchtext.toLowerCase())
  );

  return (
    <>
    <div className="page container mx-auto ">
      <NavBar/><br/><hr className='-mt-7 mb-4 text-teal-600'/>
      <h1 className='text-5xl font-bold text-center m-4 -mt-1 p-4 heading'>Your Ideas <span>Organised</span></h1>
      <SearchBar searchtext={searchtext} setSearchText={setSearchText}/>
      <MainContent notes={filteredNotes}  fullNotes={notes} handleAddNote={handleAddNote} 
      handleEdit={handleEdit}
      handleDelete={handleDelete}/>
      <Footer/>
    </div>
    </>
  )
}

function NavBar(){
  return(
    <nav className='flex justify-between p-6'>
    <div><h1 className='font-extrabold text-2xl pr-3 Logo'>NoteBasket</h1></div>
    
    <img src={menuIcon} alt='Menu' 
      className='h-6 w-6 -mr-0.25 cursor-pointer'></img>
    {/* <div><h3 className='text-lg text-gray-600'> - your ideas organised</h3></div> */}
    
  </nav>
  )
}

function SearchBar({searchtext,setSearchText}){
  const HandleSearchTextChange=(event)=>{
    setSearchText(event.target.value)

    }

  return(
    <div className='flex justify-center items-center space-x-2'>
      <img src={searchIcon} alt='Search' 
      className='h-6 w-6 -mr-0.25 '></img>
      <input type='text' 
        placeholder='Search by Title or Description' 
        value={searchtext}
        onChange={HandleSearchTextChange}
        className='bg-white m-2 mb-3 shadow-md rounded-2xl p-4 h-10 w-full max-w-xl outline-white'
      />
    
    </div>
    
  );
}

function MainContent({notes,fullNotes,handleAddNote,handleEdit,handleDelete}){
  
  return(
    <main>
    {
    fullNotes.length === 0? (
      
      <div className='flex flex-col justify-center items-center h-96'>
        <h3 className='text-xl font-bold text-center m-4 -mt-1 p-4 heading'>Add a new note to your <span className='span'>NoteBasket</span></h3>
        <AddCard handleAddNote={handleAddNote}/>
      </div>
    ):(
      <section className='gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-3 p-6'>
      <AddCard handleAddNote={handleAddNote}/>
      {
        notes.map((note,index)=>{
          const actualIndex = fullNotes.findIndex(n=> n.title === note.title && n.desc === note.desc);
        
        return(
          <NoteCard key={index} title={note.title} desc={note.desc}
          onEdit={(newTitle,newDesc)=>handleEdit(actualIndex,newTitle,newDesc)}
          onDelete={()=>handleDelete(actualIndex)}/>
        );
      }
    )}
      </section>
    )}

  </main>
  );
}

function Footer(){
  return(
    <footer className="text-gray-500 text-center pt-10">
      <p className="text-sm">
        &copy; NoteBasket - All rights reserved 2025
      </p>
    </footer>
  );
}

export default App
