import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  receiverEmail: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sendAt: { type: Date, required: true },
  status: { type: String, enum: ["pending", "sent"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
