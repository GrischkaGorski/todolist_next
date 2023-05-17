import styles from './page.module.css'
import Link from "next/link";

async function getTodos() {
    const res = await fetch('http://backend:3000/todos');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function TodoListPage() {
    const todos = await getTodos();

    return (
        <main className={styles.main}>
            {todos.map(todo =>
                    <Link href={`/todos/${todo.id}/edit`}>
                        <div className={styles.card}>
                            <p>{todo.title}</p>
                        </div>
                    </Link>
            )}
        </main>
    );
}
