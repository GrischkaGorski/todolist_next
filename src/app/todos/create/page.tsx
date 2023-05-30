import styles from '../page.module.css'
import Todo from "@/app/components/todo";
import Link from "next/link";
import {revalidatePath} from "next/cache";

export default async function Create() {
    const tags = await getTags()


    async function createTodo(formData: FormData) {
        "use server";
        const data = Object.fromEntries(formData.entries())
        await saveTodo(data)
        revalidatePath(`/todos`);
    }

    return (
        <main className={styles.main}>
            <h1>Créer todo</h1>
            <div>
                <form action={createTodo} className={styles.form}>
                    <div>
                        <label htmlFor="title">Titre</label>
                        <input type="text" name="title" placeholder="Titre"/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder="Description"/>
                    </div>
                    <div>
                        <label htmlFor="done">Terminé</label>
                        <input type="checkbox" name="done" placeholder="Statut"/>
                    </div>
                    <div>
                        <label htmlFor="tag">Tag</label>
                        <select name="tag" multiple id="tag">
                            {tags.map((tag: { id: number, name: string }) =>
                                <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                        </select>
                    </div>
                    <button type="submit">Créer</button>
                </form>
                <Link href="/todos" prefetch={true}>
                    Retourner aux todos
                </Link>
            </div>
        </main>
    );
}

async function getTags() {
    const res = await fetch('http://backend:3000/tags');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function saveTodo(data: { title?: string, description?: string, done?: string, tags?: string[] }) {
    const res = await fetch(`http://backend:3000/todos`,
        {
            method: "POST",
            body: JSON.stringify({...data, done: data.done === 'on'}),
            headers: {
                "Content-Type": "application/json",
            },
        });
    return res.text();
}