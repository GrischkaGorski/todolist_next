import styles from './page.module.css'


async function getTags() {
    const res = await fetch('http://backend:3000/tags');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Tags() {
    const tags = await getTags()

    return (
        <main className={styles.main}>
            {tags.map((tag: { id: number, name: string }) =>
                <>
                    <p>{tag.name}</p>
                </>
            )}
        </main>
    )
}