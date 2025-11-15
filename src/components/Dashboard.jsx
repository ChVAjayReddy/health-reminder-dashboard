// src/components/Dashboard.jsx
import React, { useState } from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import DailySummary from "./DailySummary"; // For the progress bar and summary

const Dashboard = () => {
  // State to hold the list of reminders
  const [reminders, setReminders] = useState([
    { id: 1, name: "Drink Water (250ml)", time: "10:00 AM", completed: true },
    { id: 2, name: "Take Medicine X", time: "12:30 PM", completed: false },
    { id: 3, name: "Drink Water (250ml)", time: "02:00 PM", completed: false },
  ]);

  // Function to add a new reminder
  const addReminder = (newReminder) => {
    setReminders([
      ...reminders,
      { id: Date.now(), ...newReminder, completed: false }, // Add ID and default completed status
    ]);
  };

  // Function to toggle the completed status of a reminder
  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
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
        {/* Left Column: Form and Summary */}
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

        {/* Right Column: Reminder List */}
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
