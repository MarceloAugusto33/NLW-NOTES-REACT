import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import logo from './assets/logonlw.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
    id: string
    date: Date
    content: string
}

export function App() {

    const [search, setSearch] = useState('')


    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem("@nlw-notes")

        if (notesOnStorage) {
            return JSON.parse(notesOnStorage)
        }

        return []
    })

    function onNoteCreated(content: string) {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        }

        const notesArray = [newNote, ...notes]

        setNotes(notesArray)
        localStorage.setItem('@nlw-notes', JSON.stringify(notesArray))
    }

    function onNoteDeleted(id: string){
        const notesArray = notes.filter(note => {
            return note.id !== id
        })

        setNotes(notesArray)
        
        localStorage.setItem('@nlw-notes', JSON.stringify(notesArray))
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value

        setSearch(query)
    }

    const filteredNotes = search !== '' ? notes.filter(note => note.content.toLowerCase().includes(search.toLocaleLowerCase())) : notes


    return (
        <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
            <img src={logo} alt="NLW EXPERT" />

            <form className='w-full'>
                <input
                    type="text"
                    placeholder='Busque sua nota'
                    onChange={handleSearch}
                    className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
                />
            </form>

            <div className='h-px bg-slate-700'>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
                <NewNoteCard onNoteCreated={onNoteCreated} />
                {filteredNotes.map(note => {
                    return <NoteCard note={note} key={note.id} onNoteDeleted={onNoteDeleted}/>
                })}
            </div>

        </div>
    )

}