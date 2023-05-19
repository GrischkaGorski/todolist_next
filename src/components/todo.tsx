import styles from "@/app/todos/page.module.css";
import Link from "next/link";
import {revalidatePath} from "next/cache";

interface TodoProps {
    todo: { id:number, title: string, description: string, done: boolean}
}

export default function Todo({todo}: TodoProps) {
    async function suppTodo(formdata: FormData) {
        "use server";
        const {id} = Object.fromEntries(formdata.entries())

        await deleteTodo( id as string);

        revalidatePath('/todos')
    }

    return (
        <>
            <Link key={todo.id} href={`/todos/${todo.id}/edit`}>
                <div className={styles.card}>
                    <p>{todo.title}</p>
                </div>
            </Link>
            <form action="">
                <input readOnly type="number" name="id" value={todo.id} style={{display: "none"}}/>
                <input formAction={suppTodo} type="submit"/>
            </form>
        </>
    )
}

async function deleteTodo(id: string) {
    const res = await fetch(`http://backend:3000/todos/${id}/delete`)

    return res.text();
}