export default async function Todos() {
    const data = await getData();

    console.log(data)

    return (
        <div>
            <h1>Home page</h1>
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
