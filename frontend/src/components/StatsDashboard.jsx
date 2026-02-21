import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function StatsDashboard({ stats }) {
  if (!stats) return null;

  const priorityData = Object.entries(
    stats.priority_breakdown || {}
  ).map(([key, value]) => ({
    name: key,
    value,
  }));

  const categoryData = Object.entries(
    stats.category_breakdown || {}
  ).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ["#2563eb", "#f59e0b", "#ef4444", "#10b981"];

  return (
    <div>
      <h3>Overview</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Tickets</h4>
          <p>{stats.total_tickets}</p>
        </div>

        <div className="stat-card">
          <h4>Open Tickets</h4>
          <p>{stats.open_tickets}</p>
        </div>

        <div className="stat-card">
          <h4>Avg / Day</h4>
          <p>{stats.avg_tickets_per_day}</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 30,
        }}
      >
        <div className="section">
          <h4>Priority Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="section">
          <h4>Category Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
