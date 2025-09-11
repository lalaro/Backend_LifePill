
const mongoose = require("mongoose");


/**
 * Notification Schema
 *
 * Represents a notification sent to a user.
 *
 * @typedef {Object} Notification
 * @property {mongoose.Types.ObjectId} userId - Reference to the User who receives the notification.
 * @property {string} message - The notification message content.
 * @property {Date} date - The date and time when the notification was created.
 * @property {boolean} read - Status indicating if the notification has been read.
 */
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
