let notifications = [];

const getNotifications = (req, res) => {
    res.json(notifications);
}

const getNotificationById = (req, res) => {
    const notification = notifications.find(n => n.id === parseInt(req.params.id));
    if (!notification) return res.status(404).send('Notification not found');
    res.json(notification);
}

const createNotification = (req, res) => {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).json(newNotification);
}

const updateNotification = (req, res) => {
    const index = notifications.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Notification not found' });
    notifications[index] = { ...notifications[index], ...req.body };
    res.json(notifications[index]);
}

const deleteNotification = (req, res) => {
    const index = notifications.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Notification not found' });
    const deleted = notifications.splice(index, 1);
    res.json(deleted[0]);
}
module.exports = { getNotifications, getNotificationById, createNotification, updateNotification, deleteNotification };