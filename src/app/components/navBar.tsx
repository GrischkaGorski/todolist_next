"use client";
import {Menu} from "antd";
import type { MenuProps } from 'antd';
import {useState} from "react";
import Link from "next/link";

const links: MenuProps['items'] = [
    {
        label: (<Link href="/">Home</Link>),
        key: 'Todos',
    },
    {
        label: (<Link href="/createTodo">Create todo</Link>),
        key: 'CreateTodo',
    },
    {
        label: (<Link href="/editTodo">Edit todo</Link>),
        key: 'EditTodo',
    },
    {
        label: (<Link href="/tags">Tags</Link>),
        key: 'Tags',
    },
]

export default function NavBar() {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={links}/>
    )
}
