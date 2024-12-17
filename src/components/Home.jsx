import React from 'react'
import { Box,Paper,Grid2, Typography } from '@mui/material'
import { useState } from 'react'
import InsertForm from './InsertForm'
import List from './List'
import { Note } from '@mui/icons-material'
export default function Home() {
  let initialValue;
  if (localStorage.getItem("notes")==null){
     initialValue = [];
  }else{
     initialValue = JSON.parse(localStorage.getItem("notes"));
  }
  const [notes,setNotes] = useState(initialValue);
  const deleteNote = (id) => {
    console.log(id);
    let remainingNotes=notes.filter((item)=>item.id !=id)
    localStorage.setItem("notes",JSON.stringify(remainingNotes))
    setNotes(remainingNotes);
   }
  const updateNote=(note)=>{
    console.log(note)
    let status;
    if(note.completed){
      status=false;
    }else{
      status=true;
    }
    let modifiedNote={...note,completed:status}
    console.log(modifiedNote);
    let noteIndex=notes.findIndex((item)=>item.id==note.id);
    console.log(noteIndex);
    let modifiedCompleteNote=[...notes];
    modifiedCompleteNote.splice(noteIndex,1,modifiedNote)
    localStorage.setItem("notes",JSON.stringify(modifiedCompleteNote))
    setNotes(modifiedCompleteNote)
  }
  return (
  <Box sx={{backgroundColor:"lightblue",
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }}>
    <Paper sx={{p:2}}>
      <Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{xs:12}}>
            <Typography sx={{
              textAlign:"center",
               fontWeight:"60",
               color:"blue",
               textTransform:"uppercase"
               }}>To do list</Typography>
          </Grid2>
          <Grid2 size={{xs:12}}>
            <InsertForm 
            setNotes={setNotes}
            notes={notes}/>
          </Grid2>
          <Grid2 size={{xs:12}}>
            <Box sx={{maxHeight:"40vh",overflow:"auto"}}>
              { notes.length>0?
              notes.map((note,index)=> (
                <List 
                updateNote={updateNote}
                deleteNote={deleteNote} 
                key={index} 
                note={note}
                />
              )) :(
                <Box>
              <Typography color="text.secondary" sx={{textAlign:"center"}}>No notes found</Typography>
            </Box>
              )
            }
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
    </Box>
  )
}
