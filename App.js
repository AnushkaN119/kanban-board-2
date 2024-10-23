import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');

    useEffect(() => {
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <div className="controls">
                <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
                    <option value="status">Group by Status</option>
                    <option value="user">Group by User</option>
                    <option value="priority">Group by Priority</option>
                </select>

                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="priority">Sort by Priority</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>
            <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
        </div>
    );
}

export default App;
