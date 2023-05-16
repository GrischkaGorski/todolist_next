export default async function CreateTodo() {
    const data = await getData();

    console.log(data)

    return (
        <div>
            <h1>Create todo page</h1>
            {data.map(e => <p>{e.title}</p>)}
        </div>
    )
}

async function getData() {
    const res = await fetch('http://backend:3000/todos');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}