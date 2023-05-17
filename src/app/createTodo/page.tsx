"use client"
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function CreateTodo() {
    const [title, setTitle] = useState('')
    console.log(title)

    const handleSubmit = (e:any) => {
        // 👇 Send a fetch request to Backend API.
        e.preventDefault();
        fetch("/todos", {
            method: "POST",
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).catch((e) => console.log(e));
    };

    return (
        <div>
            <h1>Create todo page</h1>
            <form onSubmit={(e) => handleSubmit(e)}
                  style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                <TextField
                    id="outlined-basic" label="Title" variant="outlined" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </div>
    )
}