const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages);

router.post('/messages', messageController.createMessage);

router.put('/messages/:id', messageController.updateMessage);

router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;