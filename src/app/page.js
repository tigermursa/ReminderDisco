// app/page.js
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [randomAdvice, setRandomAdvice] = useState("");
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

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
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
        fetchRandom();
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
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand-section">
            <span className="clock-icon">⏰</span>
            <span className="navbar-brand">CronAdvice</span>
          </div>
          <span className="navbar-version">v1.0</span>
        </div>
      </nav>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-pendulum">
            <div className="pendulum"></div>
          </div>
          <h1 className="hero-title">Wisdom on Repeat</h1>
          <p className="hero-subtitle">
            A dose of perspective, delivered by the clock
          </p>
        </section>

        {/* Advice Display */}
        <section className="advice-section">
          <div className="section-label">Today's Thought</div>
          <div className="advice-card">
            <blockquote className="advice-text">
              {randomAdvice || (
                <span className="loading-text">Gathering wisdom...</span>
              )}
            </blockquote>
            <button
              className="refresh-btn"
              onClick={fetchRandom}
              title="Get another piece of advice"
            >
              ✨ Refresh
            </button>
          </div>
        </section>

        <div className="divider"></div>

        {/* Add Advice Section */}
        <section className="form-section">
          <div className="section-label">Share Your Wisdom</div>
          <form onSubmit={handleSubmit} className="advice-form">
            <div className="input-wrapper">
              <textarea
                className="advice-input"
                rows="4"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="What wisdom would you share?"
              />
              <div className="input-focus-border"></div>
            </div>

            <div className="form-footer">
              <button
                type="submit"
                disabled={loading || !newText.trim()}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span>→</span> Add Advice
                  </>
                )}
              </button>

              {justAdded && (
                <div className="success-toast">✓ Added to your collection</div>
              )}
            </div>
          </form>
        </section>

        {/* Navigation */}
        <section className="nav-section">
          <a href="/quotes" className="nav-link">
            <span className="nav-icon">📚</span>
            <span>View All Quotes</span>
            <span className="nav-arrow">→</span>
          </a>
        </section>
      </main>

      <footer className="global-footer">
        <p>&copy; 2026 Mursalin</p>
        <p className="footer-tagline">Moments of wisdom, marked by time</p>
      </footer>
    </div>
  );
}
