// app/page.jsx
"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const triggerCron = async () => {
    setStatus("পাঠানো হচ্ছে...");
    try {
      const res = await fetch("/api/send-time");
      const data = await res.json();
      if (data.success) {
        setStatus(`✅ সফল! সময়: ${data.time}`);
      } else {
        setStatus(`❌ ত্রুটি: ${data.error}`);
      }
    } catch (err) {
      setStatus(`❌ নেটওয়ার্ক ত্রুটি: ${err.message}`);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>⏰ Discord Time Sender</h1>
      <button
        onClick={triggerCron}
        style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}
      >
        এখন সময় পাঠান (টেস্ট)
      </button>
      <p>{status}</p>
      <hr />
      <p>
        <strong>Cron Job URL:</strong>{" "}
        <code>{`${typeof window !== "undefined" ? window.location.origin : ""}/api/send-time`}</code>
      </p>
      <p>এই URL টি আপনার cron-job.org-এ সেট করে দিন।</p>
    </main>
  );
}
