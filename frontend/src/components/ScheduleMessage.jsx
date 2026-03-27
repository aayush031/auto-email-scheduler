import { useState } from "react";
import api from "../services/api";

export default function ScheduleMessage() {

  const [form, setForm] = useState({
    senderEmail: "",
    receiverEmail: "",
    subject: "",
    message: "",
    sendAt: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔥 FIX: Convert local time → UTC
      const localTime = new Date(form.sendAt);
      const utcTime = localTime.toISOString();

      const updatedForm = {
        ...form,
        sendAt: utcTime   // ✅ IMPORTANT FIX
      };

      await api.post("/messages", updatedForm);

      alert("Message scheduled successfully.");

      setForm({
        senderEmail: "",
        receiverEmail: "",
        subject: "",
        message: "",
        sendAt: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error scheduling message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 to-blue-100">

      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">

        <h2 className="text-xl font-bold text-black text-center mb-6">
          Auto Email Scheduler
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Sender Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Sender Email
            </label>
            <input
              type="email"
              name="senderEmail"
              value={form.senderEmail}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Receiver Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Receiver Email
            </label>
            <input
              type="email"
              name="receiverEmail"
              value={form.receiverEmail}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Schedule Time */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Schedule Time
            </label>
            <input
              type="datetime-local"
              name="sendAt"
              value={form.sendAt}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Scheduling..." : "Schedule Message"}
          </button>

        </form>

      </div>

    </div>
  );
}










