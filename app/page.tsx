"use client";
import Image from "next/image";
import { AddNote } from "./components/AddNote";
import { NotesTable } from "./components/NotesTable";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:4000";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/note/getAll");
      setNotes(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div className="flex flex-col  items-center justify-center mt-20">
      <h1 className="">NOTES </h1>
      <AddNote getAllNotes={getAllNotes}/>
      <NotesTable notes={notes} getAllNotes={getAllNotes}/>
    </div>
  );
}
