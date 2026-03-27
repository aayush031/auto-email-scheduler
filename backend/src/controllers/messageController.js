import Message from "../models/Message.js";
import { sendEmail } from "../utils/sendEmail.js";

export const scheduleMessage = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { senderEmail, receiverEmail, subject, message, sendAt } = req.body;

    if (!senderEmail || !receiverEmail || !subject || !message || !sendAt) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newMessage = await Message.create({
      senderEmail,
      receiverEmail,
      subject,
      message,
      sendAt,
      status: "pending"
    });

    // ⏰ SCHEDULING LOGIC
    const delay = new Date(sendAt) - new Date();

    console.log("⏰ Delay:", delay);

    if (delay > 0) {
      setTimeout(async () => {
        console.log("📨 Sending scheduled email...");

        await sendEmail({
          senderEmail,
          to: receiverEmail,
          subject,
          text: message
        });

        console.log("✅ Scheduled email sent");

      }, delay);
    } else {
      console.log("⚠️ Time already passed");
    }

    res.status(200).json({
      success: true,
      message: "Message scheduled successfully",
      data: newMessage
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};