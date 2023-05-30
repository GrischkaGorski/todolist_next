import styles from '../../page.module.css'
import Link from "next/link";
import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";


export default async function EditTodoPage({params}: { params: { id: number } }) {
    const {id} = params
    const todo = await getTodo(id)

    async function upTodo(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData.entries())
        await saveTodo(id, data)
        revalidatePath(`/todos`);
    }

    async function suppTodo(formdata: FormData) {
        "use server";
        const {id} = Object.fromEntries(formdata.entries())
        await deleteTodo(id as string);
        redirect("/todos");
    }

    return (
        <main className={styles.main}>
            <div>
                <h2>Modifier le todo #{todo.id}: {todo.title}</h2>
                <form action={upTodo} className={styles.form}>
                    <div>
                        <label htmlFor="title">Titre</label>
                        <input type="text" name="title" defaultValue={todo.title}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" defaultValue={todo.description}/>
                    </div>
                    <div>
                        <label htmlFor="done">Terminé</label>
                        <input type="checkbox" name="done" defaultChecked={todo.done}/>
                    </div>
                    <button type="submit">Modifier</button>
                </form>
                <Link href="/todos" prefetch={true}>
                    Retourner aux todos
                </Link>
                <form action="">
                    <input readOnly type="number" name="id" value={todo.id} style={{display: "none"}}/>
                    <input formAction={suppTodo} type="submit" value="Supprimer"/>
                </form>
            </div>
        </main>
    )
}

async function getTodo(id: number) {
    const res = await fetch(`http://backend:3000/todos/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function saveTodo(id: number, data: { title?: string, description?: string, done?: string }) {
    const res = await fetch(`http://backend:3000/todos/${id}`,
        {
            method: "POST",
            body: JSON.stringify({...data, done: data.done === 'on'}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    return res.text();
}

async function deleteTodo(id: string) {
    const res = await fetch(`http://backend:3000/todos/${id}/delete`)

    return res.text();
}