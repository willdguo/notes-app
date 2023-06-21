import { useRef } from "react"
import getNotes from "../services/getNotes"

const Note = ( { notes, setNotes, id }) => {

    const contentTimer = useRef(null) // timer to keep track of content saves
    const titleTimer = useRef(null) 

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

        clearTimeout(contentTimer.current)
        setNotes(notes.filter(note => note.id !== id).concat(updatedNote))

        contentTimer.current = setTimeout(() => {
            getNotes
                .update(id, {...currNote, content: newContent})
                .then(response => {
                    console.log(`note ${id} content saved!`)
            })
        }, 3000)

    }
    
    function changeTitle(e) {
        const newTitle = e.target.value // ? e.target.value : `New Note ${id}` // empty titles should not be allowed
        // console.log(`new title: ${newTitle}`)
        const currNote = getById(id) 
        const updatedNote = {...currNote, title: newTitle}
        //console.log(notes.filter(note => id !== note.id).concat({...currNote, title: e.target.value}))

        clearTimeout(titleTimer.current)
        setNotes(notes.filter(note => id !== note.id).concat(updatedNote))

        titleTimer.current = setTimeout(() => {
            getNotes
                .update(id, updatedNote)
                .then(response => {
                    console.log(`note ${id} title saved!`)
                })

        }, 3000)


    }

    function deleteNote(id) {
        //console.log("note.js: ")
        //console.log(id)
        getNotes
            .remove(id)
            .then(response => {
                console.log('in delete:')
                console.log(id)
                setNotes(notes.filter(note => note.id !== id))
                console.log("note deleted")
            }).catch(error => {
                console.log(error)
            })
    }

    const noteColors = ['lightyellow', '#cfeaf7', '#e9e9e9', '#f5e8ff', '#e6e6fa', '#fed7d7']
    let randColor = id.slice(-1).charCodeAt(0) % 6

    const noteContentStyle = {
        border: 'none',
        maxWidth: '100%',
        resize: 'vertical',
        minHeight: '300px',
        backgroundColor: noteColors[randColor],
        padding: '5px',
        fontSize: '16px',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"      
    }

    const noteTitleStyle = {
        border: 'none',
        borderBottom: '1px solid darkgrey',
        fontWeight: 'bold',
        backgroundColor: noteColors[randColor],
        marginBottom: '10px',
        padding: '5px',
        fontSize: '20px',
        fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    }

    const noteStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        backgroundColor: noteColors[randColor],
        border: "1px solid black",
        maxWidth: '30%',
        minWidth: '30%',
        margin: '10px',
        height: '100%',
        position: 'relative'
    }

    return (

        <div className = "note" style = {noteStyle}> 
            <input id = "note-title" style = {noteTitleStyle} value = {getById(id).title} onChange = {changeTitle} />
            <textarea id = 'note-content' style = {noteContentStyle} value={getById(id).content} onChange={changeContent} /> 
            <button onClick = {() => deleteNote(id)}> X </button>
        </div>

    )
}


export default Note