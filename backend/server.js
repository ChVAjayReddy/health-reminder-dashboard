// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Reminder Schema ---
const reminderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    time: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", reminderSchema);

// --- Routes ---

// GET all reminders
app.get("/api/reminders", async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ createdAt: -1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new reminder
app.post("/api/reminders", async (req, res) => {
  try {
    const { name, time } = req.body;
    if (!name || !time)
      return res.status(400).json({ error: "Name and Time are required" });

    const newReminder = new Reminder({ name, time });
    const savedReminder = await newReminder.save();
    res.json(savedReminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH toggle completed status
app.patch("/api/reminders/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });

    reminder.completed = !reminder.completed;
    const updatedReminder = await reminder.save();
    res.json(updatedReminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a reminder (optional)
app.delete("/api/reminders/:id", async (req, res) => {
  try {
    const deleted = await Reminder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Reminder not found" });
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
