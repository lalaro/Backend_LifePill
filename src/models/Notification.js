class Notification {
  constructor(id, userId, message, date, read = false) {
    this.id = id;
    this.userId = userId;
    this.message = message;
    this.date = date;
    this.read = read;
  }
}
module.exports = Notification;
