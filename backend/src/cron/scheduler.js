import cron from "node-cron";
import Message from "../models/Message.js";
import { sendEmail } from "../utils/sendEmail.js";

export const startScheduler = () => {
  console.log("⏰ Scheduler started");

  cron.schedule("* * * * *", async () => {
    try {

    console.log("⏰ Cron running:", new Date());

      const pendingMessages = await Message.find({
        status: "pending",
        sendAt: { $lte: new Date() }
      });

      if (pendingMessages.length === 0) return;

      console.log(`📨 Found ${pendingMessages.length} pending message(s)`);

      for (const msg of pendingMessages) {

        await sendEmail({
          senderEmail: msg.senderEmail,
          to: msg.receiverEmail,
          subject: msg.subject,
          text: msg.message
        });

        msg.status = "sent";
        await msg.save();

        console.log(`✅ Message sent: ${msg._id}`);
      }

    } catch (error) {
      console.error("❌ Scheduler error:", error.message);
    }
  });
};