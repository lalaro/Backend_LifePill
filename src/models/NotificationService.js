/**
 * NotificationService class to manage notifications and scheduled notifications.
 * @param {String []} notifications - List of notifications.
 * @param {object []} scheduledNotifications - List of scheduled notifications.
 */
class NotificationService {
    constructor(notifications, scheduledNotifications) {
        this.notifications = notifications;
        this.scheduledNotifications = scheduledNotifications;
    }
}