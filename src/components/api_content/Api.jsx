import { useEffect, useState } from "react"

export default function Api() {
    const [data, setData] = useState ([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        try {
            const response = await fetch('http://localhost:9000/todos');
            const data = await response.json();
            setData(data);
            // setLoading(false);
        } catch(e) {
            setError('' + e);
        }
    }
    
    useEffect(() => {
        handleFetch()
    });

    // if(loading) return <p>Loading...</p>
    if(error) return <p className="text-red-500">{error}</p>

    return (
        <div className="api">
            <div className="list-container">
                {data.length > 0 ? (
                    <ul>
                        {data.map((todo) => (
                            <li key={todo.id}>
                                <span>{todo.text}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    error ? <p>{error}</p> : <p>No task</p>
                )
                }
            </div>
        </div>
    )
}