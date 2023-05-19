import styles from './page.module.css'
import Todo from "@/app/components/todo";

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
            {todos.map((todo: { id: number, title: string, description: string, done: boolean}) =>
                <>
                    <Todo todo={todo}/>
                </>
            )}
        </main>
    );
}
