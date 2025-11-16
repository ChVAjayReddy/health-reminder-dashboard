// src/components/DailySummary.jsx
import React from "react";

const DailySummary = ({ reminders }) => {
  const total = reminders.length;
  const completed = reminders.filter((r) => r.completed).length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-4">
      <p className="text-xl font-medium text-gray-800">
        You've completed {completed} out of {total} tasks today.
      </p>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-indigo-700">
            Progress
          </span>
          <span className="text-sm font-medium text-indigo-700">
            {Math.round(completionRate)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {completionRate === 100 && (
        <p className="text-center text-green-600 font-bold mt-4">
          Great job! All reminders completed! 🎉
        </p>
      )}
    </div>
  );
};

export default DailySummary;
