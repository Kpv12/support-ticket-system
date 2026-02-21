import { useState, useEffect } from "react";
import { createTicket, classifyTicket } from "../api";

function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!description.trim()) return;

      setLoading(true);
      try {
        const res = await classifyTicket(description);
        setCategory(res.data.suggested_category);
        setPriority(res.data.suggested_priority);
      } catch (err) {
        console.log("Classification failed");
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(delay);
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await createTicket({
        title,
        description,
        category,
        priority,
        status: "open",
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");

      onSuccess();
    } catch (err) {
      console.log("Error submitting ticket");
    }

    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Submit Ticket</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {loading && <p>Classifying...</p>}

        <input
          type="text"
          placeholder="Category"
          value={category}
          readOnly
        />

        <input
          type="text"
          placeholder="Priority"
          value={priority}
          readOnly
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
