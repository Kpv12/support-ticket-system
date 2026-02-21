import { useState } from "react";
import axios from "axios";

function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "technical",
    priority: "medium",
    status: "open",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/tickets/",
        formData
      );

      if (onTicketCreated) {
        onTicketCreated(res.data);
      }

      setFormData({
        title: "",
        description: "",
        category: "technical",
        priority: "medium",
        status: "open",
      });

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Ticket</h3>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="technical">Technical</option>
        <option value="billing">Billing</option>
        <option value="general">General</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Submit Ticket</button>
    </form>
  );
}

export default TicketForm;
