// src/components/ReminderForm.jsx
import React, { useState } from "react";

const ReminderForm = ({ onAddReminder }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !time) return; // Simple validation

    onAddReminder({ name, time });

    // Clear the form
    setName("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="task-name"
          className="block text-sm font-medium text-gray-700"
        >
          Task Name (e.g., Take Medicine, Drink Water)
        </label>
        <input
          type="text"
          id="task-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="e.g., Take Med X"
          required
        />
      </div>

      <div>
        <label
          htmlFor="task-time"
          className="block text-sm font-medium text-gray-700"
        >
          Time
        </label>
        <input
          type="time"
          id="task-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
      >
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;
