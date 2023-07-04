import React, {useState, useEffect, useRef} from "react"
import Note from './components/Note.js'
import getNotes from "./services/getNotes.js"
import Login from './components/Login.js'

function App() {

  const [notes, setNotes] = useState([{title: 'If you see this, something aint right', content: `Check to see if working: \n axios \n getById \n server`, id: "1"}])
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)

  const [description, setDescription] = useState('')
  const finalDescription = "Built with React + Node + Render + MongoDB \nMade for Shay"
  const n = useRef(0)
  const t = useRef(300)
  const flickers = 6
  const searchTimer = useRef(null)
  const [sorted, setSorted] = useState(false)

  // loads notes upon window load
  useEffect(() => {
    getNotes.getAll()
      .then(response => {
        setNotes(response.data)
      })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    
    if(loggedUserJSON) {
      const saved = JSON.parse(loggedUserJSON)
      setUser(saved)
      getNotes.setToken(saved.token)
    }
  }, [])


  // simulation of "writing" the intro description at the start
  useEffect(() => {
    
    const timer = setTimeout(() => {

      n.current = n.current + 1
      t.current = n.current < flickers || n.current - flickers > finalDescription.length ? 450 : 60

      if(n.current < flickers){
        setDescription(['|','\u00A0'][n.current % 2])
      } else if (n.current - flickers <= finalDescription.length){
        setDescription(finalDescription.substring(0, n.current - flickers) + ' \u00A0')
      } else if (n.current - 2 * flickers <= finalDescription.length) {
        //console.log(n.current)
        setDescription(`${finalDescription} ${['|', '\u00A0'][n.current % 2]}`)
      }

    }, t.current)

    return () => clearTimeout(timer)

  }, [description])


  function addNote() {

    const newNote = {
      title: `New Note`, 
      content: `What's up?`,
      date_created: new Date(), 
    }

    getNotes
      .create(newNote)
      .then(response => {
        // console.log("now resposne")
        // console.log(response)
        const newId = response.id
        // console.log(newId)
        // console.log(response)
        // console.log("in create")
        setNotes(notes.concat({...newNote, id: newId}))

        console.log(response.date_created)
        console.log(Date(response.date_created))
      })
  }

  const handleFilter = (e) => {

    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setFilter(e.target.value.trim())
      console.log(filter)
    }, 500)
    
  }

  const toggleSort = () => {
    setSorted(!sorted)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
    console.log(window.localStorage)
  }

  const mainContainer = () => (
    <div>
      <button className = "logout" onClick = {logout}> Logout </button>

      <div className = "notes-filter">
          <input className = "notes-filter-input" type = "text" placeholder = " Search " onChange = {handleFilter}/>
          <button className = {`sort-button ${sorted ? 'sorted' : ''}`} onClick = {toggleSort}> Sort </button>
      </div>

      <div className = "notes-container">

        {filter.trim() 
          ? notes.filter(note => (
            note.title.toLowerCase().includes(filter.toLowerCase()) || 
            note.content.toLowerCase().includes(filter.toLowerCase())
            )).map(note => (
              <Note notes = {notes} setNotes = {setNotes} id = {note.id} key = {note.id}/>
            ))
          : notes.slice().sort((a, b) => sorted ? new Date(a.date_created) - new Date(b.date_created) : -1).map(note => (
              <Note notes = {notes} setNotes = {setNotes} id = {note.id} key = {note.id}/>
            ))
        }

        <div className = "addNote">
          <button id = "addNote-button" onClick={addNote}> <p id = "icon"> + </p> </button>
        </div>

      </div>
    </div>
  )

  // to do: addNote button & div is different size than note div

  return (
    <div>

      <div className = "intro">

        <h1 onClick = {() => console.log(user)}> Jot </h1>
        <p style={{ whiteSpace: 'pre-line' }}> <i> {description} </i> </p>

      </div>

      {user === null
        ? <Login user = {user} setUser = {setUser}/>
        : mainContainer() }

    </div>
  )

}

export default App;
