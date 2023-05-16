"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

export default function NavBar() {

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar>
                    <Stack direction="row" spacing={2}>
                        <Link href="/">
                            Todo list
                        </Link>

                        <Link href="/createTodo">
                            Create todo
                        </Link>

                        <Link href="/tags">
                            Tags list
                        </Link>

                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
