import { useEffect, useState } from "react";
import { updateTicket } from "../api";
import TicketItem from "./TicketItem";

function TicketList({ tickets, reload, refreshStats }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      reload(filters);
    }, 300);

    return () => clearTimeout(delay);
  }, [filters]);

  const handleStatusChange = async (id, status) => {
    await updateTicket(id, { status });
    reload(filters);
    refreshStats();
  };

  return (
    <div>
      <h3>Tickets</h3>

      <div className="filters">
        <input
          placeholder="Search tickets..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
          <option value="general">General</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}

export default TicketList;
