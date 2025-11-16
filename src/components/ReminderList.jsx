// src/components/ReminderList.jsx
import React from "react";

const ReminderList = ({ reminders, onToggle }) => {
  if (reminders.length === 0) {
    return <p className="text-gray-500 italic">No reminders yet. Add one!</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {reminders.map((reminder) => (
        <li
          key={reminder._id}
          className="py-4 flex items-center justify-between hover:bg-gray-50 transition duration-100 px-2 rounded-md"
        >
          <div className="flex flex-col">
            <span
              className={`text-lg font-medium ${
                reminder.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }`}
            >
              {reminder.name}
            </span>
            <span className="text-sm text-indigo-500 font-semibold">
              {reminder.time}
            </span>
          </div>

          <button
            onClick={() => onToggle(reminder._id)}
            className={`py-1 px-3 text-sm font-semibold rounded-full transition duration-200 ${
              reminder.completed
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
          >
            {reminder.completed ? "Completed" : "Mark Done"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;
