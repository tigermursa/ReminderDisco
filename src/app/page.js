"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">⏰ CronAdvice</span>
        <span className="navbar-version">v1.0</span>
      </nav>

      <div className="main-container">
        <div className="card">
          <h2 className="card-title">সিস্টেম সক্রিয়</h2>
          <p className="card-subtitle">
            প্রতি ৩০ মিনিটে একটি করে উপদেশ/হাদিস আপনার Discord-এ পাঠানো হবে।
          </p>
          <div className="footer-info">
            <p className="hint">
              Cron-job.org তে এই URL দিন:{" "}
              <span className="cron-url">{origin}/api/send-note</span>
            </p>
            <p className="hint" style={{ marginTop: "0.5rem" }}>
              মোট ৩০টি উপদেশ/হাদিস সংরক্ষিত আছে।
            </p>
          </div>
        </div>
      </div>

      <footer className="global-footer">&copy; 2026 CronAdvice</footer>
    </>
  );
}
