import { useEffect, useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatsDashboard from "./components/StatsDashboard";
import { getTickets, getStats } from "./api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTickets = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getTickets(params);
      setTickets(res.data);
    } catch (err) {
      console.log("Error loading tickets");
    }
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.log("Error loading stats");
    }
  };

  useEffect(() => {
    loadTickets();
    loadStats();
  }, []);

  return (
    <div className="container">
      <h1>Support Ticket Dashboard</h1>

      {stats && <StatsDashboard stats={stats} />}

      <TicketForm
        onSuccess={() => {
          loadTickets();
          loadStats();
        }}
      />

      <TicketList
        tickets={tickets}
        loading={loading}
        reload={loadTickets}
        refreshStats={loadStats}
      />
    </div>
  );
}

export default App;
