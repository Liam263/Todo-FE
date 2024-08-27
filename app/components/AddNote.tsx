'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
type Props = {
    getAllNotes: () =>void
}
export const AddNote = ({getAllNotes}:Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const handleAddNote = async ()=> {
        const res = await axios.post(`http://localhost:4000/note/createNote`, {
            name, 
            description
        })
        getAllNotes();
        setOpen(false);
        console.log("Created note", res.data.data)
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className='w-1/3' onClick={()=>setOpen(true)}>Add note </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Add note info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddNote}>Add note</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
