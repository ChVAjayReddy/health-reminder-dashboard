// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import DailySummary from "./DailySummary";

const BASE_URL = "http://localhost:5000"; // Replace with deployed backend URL when deployed

const Dashboard = () => {
  const [reminders, setReminders] = useState([]);

  // Fetch all reminders on load
  useEffect(() => {
    fetch(`${BASE_URL}/api/reminders`)
      .then((res) => res.json())
      .then((data) => setReminders(data))
      .catch((err) => console.error("Error fetching reminders:", err));
  }, []);

  // Add a new reminder
  const addReminder = async (newReminder) => {
    try {
      const res = await fetch(`${BASE_URL}/api/reminders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });
      const savedReminder = await res.json();
      setReminders([...reminders, savedReminder]);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  // Toggle completed status
  const toggleReminder = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/reminders/${id}`, {
        method: "PATCH",
      });
      const updatedReminder = await res.json();
      setReminders(reminders.map((r) => (r._id === id ? updatedReminder : r)));
    } catch (err) {
      console.error("Error toggling reminder:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">
          Health Reminder Dashboard 💧
        </h1>
        <p className="text-gray-500">
          Stay on track with your water and medicine.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 shadow-xl rounded-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add New Reminder
            </h2>
            <ReminderForm onAddReminder={addReminder} />
          </div>

          <div className="bg-white p-6 shadow-xl rounded-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Daily Progress
            </h2>
            <DailySummary reminders={reminders} />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 bg-white p-6 shadow-xl rounded-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Tasks
          </h2>
          <ReminderList reminders={reminders} onToggle={toggleReminder} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
