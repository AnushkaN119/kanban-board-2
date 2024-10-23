import React from 'react';
import TicketCard from './TicketCard';

const KanbanBoard = ({ tickets, groupBy, sortBy }) => {
    const sortTickets = (tickets) => {
        if (sortBy === 'priority') {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        } else if (sortBy === 'title') {
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        }
        return tickets;
    };

    const groupTickets = (tickets) => {
        const grouped = {};
        tickets.forEach(ticket => {
            const key = ticket[groupBy];
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ticket);
        });
        return grouped;
    };

    const groupedTickets = groupTickets(sortTickets(tickets));

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map((group, idx) => (
                <div className="kanban-column" key={idx}>
                    <h3>{group}</h3>
                    {groupedTickets[group].map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
