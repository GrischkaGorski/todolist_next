"use client"
import React, {useEffect, useState} from 'react';
import {Button, MenuItem, IconButton, TextField, Collapse, Alert} from "@mui/material";


export default function CreateTodo() {
    const [tags, setTags] = useState([])
    const [todoTitle, setTitle] = useState('')
    const [todoDescription, setDescription] = useState('')
    const [todoTags, setTodoTags] = useState<string[]>([])
    const [todoDone, setTodoDone] = useState('')
    const [dataUpdated, setDataUpdated] = useState(false)


    useEffect(() => {
        fetch('http://localhost:3000/tags')
            .then(response => response.json())
            .then(data => setTags(data));
        setDataUpdated(false)
    }, []);
    console.log(todoTitle)

    const handleSubmit = (e:any) => {
        // 👇 Send a fetch request to Backend API.
        e.preventDefault();
        fetch("/todos", {
            method: "POST",
            body: JSON.stringify({
                title: todoTitle,
                description: todoDescription
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
                    id="outlined-basic" label="Title" variant="outlined" value={todoTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    id="outlined-basic" label="Description" variant="outlined" value={todoDescription}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/*<TextField*/}
                {/*    id="todo-tag"*/}
                {/*    select*/}
                {/*    label="Tag"*/}
                {/*    defaultValue=""*/}
                {/*    helperText="Sélectionne un tag"*/}
                {/*    onChange={(e) => setTodoTags(Array.from(e.target.value))}*/}
                {/*>*/}
                {/*    /!*{tags.map((tag) => (*!/*/}
                {/*    /!*    <MenuItem key={tag.id} value={tag.id}>*!/*/}
                {/*    /!*        {tag.name}*!/*/}
                {/*    /!*    </MenuItem>*!/*/}
                {/*    /!*))}*!/*/}

                {/*</TextField>*/}
                {/*<TextField*/}
                {/*    id="todo-done"*/}
                {/*    select*/}
                {/*    label="Statut de la tâche"*/}
                {/*    defaultValue=""*/}
                {/*    helperText="Sélectionne si la tâche est déjà faite ou non"*/}
                {/*    onChange={(e) => setTodoDone(e.target.value)}*/}
                {/*>*/}
                {/*    /!*<MenuItem value={true}>*!/*/}
                {/*    /!*    Tâche faite*!/*/}
                {/*    /!*</MenuItem>*!/*/}
                {/*    /!*<MenuItem value={false}>*!/*/}
                {/*    /!*    Tâche à faire*!/*/}
                {/*    /!*</MenuItem>*!/*/}

                {/*</TextField>*/}
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </div>
    )
}