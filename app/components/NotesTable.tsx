"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { EditNote } from "./EditNote";

type Note = {
    _id: string;
    name: string;
    description: string;
}
type Props = {
    notes: Note[];
    getAllNotes: ()=> void
}
export const NotesTable = ({notes, getAllNotes}:Props) => {

  
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:4000/note/delete/${id}`);
      console.log(res.data);
      getAllNotes()
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="w-1/3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Notes</TableHead>
            <TableHead className="text-left">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note:Note) => (
            <TableRow key={note._id}>
              <TableCell className="font-medium">{note.name}</TableCell>
              <TableCell className="text-left">{note.description}</TableCell>
              <TableCell className="flex flex-row gap-2">
                <EditNote noteId={note._id} initialName={note.name} initialDescription={note.description} 
                getAllNotes={getAllNotes}/>
                <Trash
                  className="text-destructive"
                  onClick={()=>handleDelete(note._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
