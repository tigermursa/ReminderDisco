// app/page.js
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [randomAdvice, setRandomAdvice] = useState("");
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch random advice from the new endpoint (no Discord)
  const fetchRandom = async () => {
    try {
      const res = await fetch("/api/advice/random");
      const data = await res.json();
      if (data.advice) setRandomAdvice(data.advice);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText.trim() }),
      });
      if (res.ok) {
        setNewText("");
        fetchRandom(); // refresh the random advice
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
    fetchRandom();
  }, []);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">⏰ CronAdvice</span>
        <span className="navbar-version">v1.0</span>
      </nav>

      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Random Advice</h2>
        <blockquote style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
          {randomAdvice || "Loading..."}
        </blockquote>

        <hr />

        <h3>Add New Advice</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="3"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter new advice..."
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          <a href="/quotes">View all quotes →</a>
        </p>
      </main>

      <footer className="global-footer">&copy; 2026 Mursalin</footer>
    </>
  );
}
