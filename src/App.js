import React, {useState, useEffect, useRef} from "react"
import Note from './components/Note.js'
import getNotes from "./services/getNotes.js"

function App() {

  const [notes, setNotes] = useState([{title: 'If you see this, something aint right', content: `Check to see if working: \n axios \n getById \n server`, id: "1"}])
  const [description, setDescription] = useState('')
  const finalDescription = "Built with React + Node + Render + MongoDB \nMade for Shay"
  const n = useRef(0)
  const t = useRef(300)
  const flickers = 6

  // loads notes upon window load
  useEffect(() => {
    getNotes
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
      
  }, [])


  // "write out" the intro description at the start
  useEffect(() => {
    
    const timer = setTimeout(() => {
      //console.log(n)

      n.current = n.current + 1
      t.current = n.current < flickers || n.current - flickers > finalDescription.length ? 450 : 60

      if(n.current < flickers){
        setDescription(['|','\u00A0'][n.current % 2])
      } else if (n.current - flickers <= finalDescription.length){
        setDescription(finalDescription.substring(0, n.current - flickers))
      } else if (n.current - 2 * flickers + 1 <= finalDescription.length) {
        //console.log(n.current)
        setDescription(`${finalDescription} ${['|', '\u00A0'][n.current % 2]}`)
      }

    }, t.current)

    // if (n.current - 2 * flickers === finalDescription.length){
    //   console.log("animation done")
    //   clearTimeout(timer)
    // }

    return () => clearTimeout(timer)

  }, [description])


  function addNote() {
    // const newId = Math.floor(Math.random() * 10e8) // later: let MongoDB take over the ID

    const newNote = {
      title: `New Note`, 
      content: `What's up?`, 
      /*id: newId */
    }

    getNotes
      .create(newNote)
      .then(response => {
        const newId = response.data.id
        console.log(newId)
        console.log(response)
        console.log("in create")
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
  return (
    <div>

      <div className = "intro">

        <h1> Jot </h1>
        <p style={{ whiteSpace: 'pre-line' }}> <i> {description} </i> </p>

      </div>

      <div className = "notes-filter">
          <input className = "notes-filter-input" type = "text" placeholder = " Search " />
      </div>

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
