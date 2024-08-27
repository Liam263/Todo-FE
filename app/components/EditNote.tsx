import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Pencil, Trash } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    noteId: string;
    initialName: string;
    initialDescription: string;
    getAllNotes: () =>void;
}
export const EditNote = ({noteId, initialName, initialDescription, getAllNotes} :Props) => {
    const [name, setName] = useState(initialName)
    const [description, setDescription] = useState(initialDescription)
    const [open, setOpen] = useState(false)
    const handleEditNote = async() => {
        const res = await axios.patch(`http://localhost:4000/note/update/${noteId}`, {
            name,
            description
        })
        console.log("note updated", res.data.data)
        getAllNotes(); 
        setOpen(false)
    }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
            <Pencil onClick={()=>setOpen(true)}/>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit note info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              defaultValue={name}
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
              defaultValue={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEditNote}>Edit note</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
