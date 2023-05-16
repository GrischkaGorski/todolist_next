"use client"
import {useEffect, useState} from "react";
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
    const [expanded, setExpanded] = useState(false);
    const data = await getData();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    console.log(data)

    return (
        <div className={styles.homeContainer}>
            <h1 style={{color: "white"}}>A faire</h1>
            <div className="home_todos-container">
                {data && (
                    data.map((todo:any, index:number) =>
                        <div key={index}>
                            <Accordion expanded={expanded === `panel${todo.id}`}
                                       onChange={handleChange(`panel${todo.id}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls={`panel${todo.id}-content`}
                                    id={`panel${todo.id}bh-header`}
                                >
                                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                        <div style={{display: "flex", alignItems: "center", padding: "12px"}}>
                                            {todo.done ?
                                                (<IconButton color="primary" aria-label="add to shopping cart"
                                                             onClick={() => handleNotDone(todo.id)}>
                                                        <BookmarkAddedIcon/>
                                                    </IconButton>
                                                )
                                                :
                                                <IconButton color="primary" aria-label="add to shopping cart"
                                                            onClick={() => handleDone(todo.id)}>
                                                    <PendingActionsIcon/>
                                                </IconButton>
                                            }
                                            <Typography sx={{width: '66%', flexShrink: 0}}>
                                                {todo.title}
                                            </Typography>
                                        </div>

                                        {todo.tags.length ? (
                                            todo.tags.map((tag, index) =>
                                                <Chip
                                                    key={index}
                                                    icon={<BookmarkBorderIcon color="warning"/>}
                                                    label={tag.name}
                                                    variant="outlined"
                                                    sx={{width: "fit-content"}}
                                                />)
                                        ) : null}
                                    </div>

                                </AccordionSummary>
                                {todo.description ?
                                    <AccordionDetails>
                                        <Typography sx={{color: "grey"}}>
                                            {todo.description}
                                        </Typography>
                                    </AccordionDetails> : null}
                            </Accordion>

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