import { useEffect, useState } from 'react';

export default function Content() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');

    const handleFetchAPI = async () => {
        try {
            const response = await fetch('https://my-todo-be.vercel.app/todos')
            .catch(e => setError(e))
            const data = await response.json();
            setTodos(data);
        } catch (e) {
            console.error(e);
            setError(e);
        }
    }

    useEffect(() => {
        handleFetchAPI();
    }, []);

    const handleRefresh = () => {
        location.reload();
    }

    return (
        <>
            <div className="content-app p-5 mt-[100px]">
                <div onClick={handleRefresh} className='refresh-btn p-2 justify-end float-right bg-slate-800 hover:bg-slate-700 inline-block text-slate-200 font-bold rounded-md cursor-pointer'>Refresh</div>
                <h1 className="title-list text-2xl font-bold mb-4">Your Task</h1>
                <div className="list p-5 bg-slate-200 rounded-xl">
                    {error && <p className='text-red-500'>{error}</p>}
                    {todos.length > 0 ? (
                        <ul className="space-y-4">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="p-4 bg-slate-50 rounded shadow flex justify-between items-center"
                                >
                                    <span className="text-lg">{todo.text}</span>
                                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {todo.completed ? 'Completed' : 'Not Completed'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks available</p>
                    )}
                </div>
            </div>
        </>
    );
}