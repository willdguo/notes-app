import React, {useState, useEffect} from "react"
import Note from './components/Note.js'
import getNotes from "./services/getNotes.js"

function App() {

  const [notes, setNotes] = useState([{title: 'If you see this, something aint right', content: `Check to see if working: \n axios \n getById \n server`, id: 1}])

  useEffect(() => {
    getNotes
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
      
  }, [])

  function addNote() {
    // const newId = Math.floor(Math.random() * 10e8) // later: let MongoDB take over the ID

    const newNote = {
      title: `New Note`, 
      content: `What's up?`, 
      /*id: newId */}

    getNotes
      .create(newNote)
      .then(response => {
        const newId = response.data.id
        //console.log(newId)
        //console.log("in create")
        setNotes(notes.concat({...newNote, id: newId}))
      })

    // getNotes
    //   .remove(2)
    //   .then(response => {
    //     console.log("note deleteed")
    //   })
  }

  // to do: addNote button & div is different size than note div
  // to do: currently, most recently edited note is sent to the very front
  //to do: fix Add new note
  return (
    <div>

      <h1> Notes App Testing </h1>

      <div className = "notes-container">

        {notes.slice().reverse().map(note => (
          <Note notes = {notes} setNotes = {setNotes} id = {note.id} key = {note.id}/>
        ))}
        

        <div className = "addNote">
          <button id = "addNote-button" onClick={addNote}> <p id = "icon"> + </p> </button>
        </div>

      </div>

    </div>
  )

}

export default App;
