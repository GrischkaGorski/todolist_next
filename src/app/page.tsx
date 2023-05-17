export default async function TodoList() {
    const data = await getData();

    console.log(data)

    return (
        <div>
            <h1 style={{color: "white"}}>A faire</h1>
            <div className="home_todos-container">
                {data && (
                    data.map((todo:any) =>
                        <div key={todo.id} style={{border: "1px solid black"}}>
                            <h2>Titre</h2>
                            <p>{todo.title}</p>
                            {todo.description ? (
                                <>
                                    <h3>Description</h3>
                                    <p>{todo.description}</p>
                                </>
                            ) : null}
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