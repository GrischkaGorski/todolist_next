// "use client"
// import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Chip
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./page.module.css";

export default async function TodoList() {
    // const [expanded, setExpanded] = useState(false);
    const data = await getData();

    console.log(data)

    return (
        <div className={styles.homeContainer}>
            <h1 style={{color: "white"}}>A faire</h1>
            <div className="home_todos-container">
                {data && (
                    data.map((todo:any, index:number) =>
                        <div key={index}>
                            <p>{todo.title}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

async function getData() {
    const res = await fetch('http://backend:3000/todos');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}