// app/quotes/page.js
"use client";

import { useEffect, useState } from "react";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/advice");
      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`/api/advice/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotes(quotes.filter((q) => q._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const startEdit = (quote) => {
    setEditingId(quote._id);
    setEditText(quote.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/advice/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText.trim() }),
      });
      if (res.ok) {
        const updated = await res.json();
        setQuotes(quotes.map((q) => (q._id === id ? updated : q)));
        cancelEdit();
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">⏰ CronAdvice</span>
        <span className="navbar-version">v1.0</span>
      </nav>

      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2>All Quotes</h2>
        <p>
          <a href="/">← Back to home</a>
        </p>
        {quotes.length === 0 && <p>No quotes yet.</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {quotes.map((quote) => (
            <li
              key={quote._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              {editingId === quote._id ? (
                <div>
                  <textarea
                    rows="2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      fontSize: "1rem",
                    }}
                  />
                  <div style={{ marginTop: "0.5rem" }}>
                    <button
                      onClick={() => saveEdit(quote._id)}
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: "1.2rem" }}>{quote.text}</p>
                  <div>
                    <button onClick={() => startEdit(quote)}>Edit</button>
                    <button
                      onClick={() => handleDelete(quote._id)}
                      style={{ marginLeft: "0.5rem", color: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>

      <footer className="global-footer">&copy; 2026 Mursalin</footer>
    </>
  );
}
