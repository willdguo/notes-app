import React, {useState} from "react"
import Note from './components/Note.js'

function App() {

  const [notes, setNotes] = useState([{title: 'New Note Title', content: `What's Up?`, id: 1}])

  function addNote() {
    const newId = Math.floor(Math.random() * 10e8) // later: let MongoDB take over the ID
    const newNotes = notes.concat({title: `New Note ${notes.length}`, content: `What's up?`, id: newId})
    //console.log(newNotes)
    setNotes(newNotes)
  }

  // to do: addNote button & div is different size than note div
  // to do: currently, most recently edited note is sent to the very front
  return (
    <div>

      <h1> Notes App Testing </h1>

      <div className = "notes-container">

        {notes.slice().reverse().map(note => (
          <Note notes = {notes} setNotes = {setNotes} id = {note.id} key = {note.id}/>
        ))}
        

        <div className = "addNote">
          <button id = "addNote-button" onClick={addNote}> Add New Note (plz fix dogshit UI) </button>
        </div>

      </div>

    </div>
  )

}

export default App;
