const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     description: Retorna una lista con todas las notificaciones registradas.
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64a7b2c1d6e4f1b2c3d4e5f6
 *                   title:
 *                     type: string
 *                     example: Recordatorio de medicación
 *                   message:
 *                     type: string
 *                     example: Toma tu pastilla a las 8 AM
 */
router.get('/', notificationController.getNotifications);

/**
 * @openapi
 * /notifications/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     description: Retorna una notificación específica según su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación
 *         schema:
 *           type: string
 *           example: 64a7b2c1d6e4f1b2c3d4e5f6
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *       404:
 *         description: Notificación no encontrada
 */
router.get('/:id', notificationController.getNotificationById);

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Crear una nueva notificación
 *     description: Crea y guarda una notificación en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: Recordatorio de medicación
 *               message:
 *                 type: string
 *                 example: Toma tu pastilla a las 8 AM
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 */
router.post('/', notificationController.createNotification);

/**
 * @openapi
 * /notifications/{id}:
 *   put:
 *     summary: Actualizar una notificación
 *     description: Actualiza los datos de una notificación existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación
 *         schema:
 *           type: string
 *           example: 64a7b2c1d6e4f1b2c3d4e5f6
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nuevo título
 *               message:
 *                 type: string
 *                 example: Nuevo mensaje actualizado
 *     responses:
 *       200:
 *         description: Notificación actualizada correctamente
 *       404:
 *         description: Notificación no encontrada
 */
router.put('/:id', notificationController.updateNotification);

/**
 * @openapi
 * /notifications/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     description: Borra una notificación de la base de datos por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación
 *         schema:
 *           type: string
 *           example: 64a7b2c1d6e4f1b2c3d4e5f6
 *     responses:
 *       200:
 *         description: Notificación eliminada correctamente
 *       404:
 *         description: Notificación no encontrada
 */
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
