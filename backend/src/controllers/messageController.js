const Message = require('../Models/Messages');

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
        res.render('index', { messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createMessage = async (req, res) => {
    const { name, message } = req.body;
    console.log('From data:', { name, message });

    if (name && message) {
        try {
            await Message.create({ name, message });
            console.log('Message saved:', { name, message });
            res.redirect('/');
        } catch (err) {
            console.error('Error saving message:', err);
            res.status(500).send('Server Error');
        }
    } else {
        res.status(400).send('Bad Request: Name and message are required');
    }
}

const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { message, name } = req.body;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            id, 
            { name, message }, 
            { new: true }
        );

        if (!updatedMessage) {
            console.log('Message not found for update:', id);
            return res.status(404).json({ error: 'Message not found' });
        }   

        console.log('Message updated successfully:', updatedMessage);
        res.redirect('/');

    } catch (err) {
        console.error('Error updating message:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Message deleted successfully:', id);
        res.redirect('/');

    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    Message,
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
};