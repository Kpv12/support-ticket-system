function TicketItem({ ticket, onStatusChange }) {
  return (
    <div className="ticket-card">
      <h4>{ticket.title}</h4>

      <p>
        {ticket.description.length > 150
          ? ticket.description.slice(0, 150) + "..."
          : ticket.description}
      </p>

      <div className="ticket-meta">
        Category: {ticket.category}
      </div>

      <div style={{ marginTop: 8 }}>
        <span className={`badge badge-${ticket.priority}`}>
          {ticket.priority}
        </span>{" "}
        <span className={`badge badge-${ticket.status}`}>
          {ticket.status}
        </span>
      </div>

      <div className="ticket-meta">
        Created: {new Date(ticket.created_at).toLocaleString()}
      </div>

      <div style={{ marginTop: 14 }}>
        <select
          value={ticket.status}
          onChange={(e) =>
            onStatusChange(ticket.id, e.target.value)
          }
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
}

export default TicketItem;
