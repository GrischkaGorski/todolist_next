"use client"
import React from 'react';
import TextField from '@mui/material/TextField';


export default async function CreateTodo() {
    const data = await getData();

    console.log(data)

    return (
        <div style={{margin: "0 auto"}}>
            <h1>Create todo page</h1>
            <form action="/http://backend:3000/todos" method="post" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <label>Title</label>
                    <input style={{width: "300px"}} type="text"></input>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <label>Description</label>
                    <input style={{width: "300px"}} type="text"></input>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <label>Tag</label>
                    <input style={{width: "300px"}} type="text"></input>
                </div>
                <button type="submit">
                    coucou sdsd
                </button>
            </form>
        </div>
    )
}

async function getData() {
    const res = await fetch('http://backend:3000/todos');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    console.log("ok")

    return res.json();
}

