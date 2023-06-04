import getNotes from "../services/getNotes"

const Note = ( { notes, setNotes, id }) => {

    function getById(id) {

        let output = notes.filter(note => note.id === id)

        if(output){
            return(output[0])
        } else {
            console.log("getById failed")
            const tempNote = {
                title: "No note found",
                content: "No note found - check to validate id exists",
                id: -1
            }
            return tempNote
        }

    }

    function changeContent(e) {
        const newContent = e.target.value
        //console.log(`new content: ${newContent}`)
    
        const currNote = getById(id)
        const updatedNote = {...currNote, content: newContent}

        getNotes
            .update(id, {...currNote, content: newContent})
            .then(response => {
                setNotes(notes.filter(note => note.id !== id).concat(updatedNote))
            })

      }
    
      function changeTitle(e) {
        const newTitle = e.target.value // ? e.target.value : `New Note ${id}` // empty titles should not be allowed
        // console.log(`new title: ${newTitle}`)
        const currNote = getById(id) 
        const updatedNote = {...currNote, title: newTitle}
        //console.log(notes.filter(note => id !== note.id).concat({...currNote, title: e.target.value}))
        getNotes
            .update(id, updatedNote)
            .then(response => {
                setNotes(notes.filter(note => id !== note.id).concat(updatedNote))
            })
    }

    const noteContentStyle = {
        border: 'none',
        maxWidth: '100%',
        resize: 'vertical',
        minHeight: '300px',
        backgroundColor: 'lightyellow',
        padding: '5px',
        fontSize: '16px',        
    }

    return (

        <div className = "note"> 
            <input id = "note-title" value = {getById(id).title} onChange = {changeTitle} />
            <textarea id = 'note-content' style = {noteContentStyle}  value={getById(id).content} onChange={changeContent}/> 
        </div>

    )
}


export default Note