const Message = require('./Models/Messages');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const configViewEngine = require('./config/viewEngine');
const messageRoutes = require('./routes/messageRoutes');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', messageRoutes);

configViewEngine(app);

async function connectDB() {
    try {  
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/guestbook');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

connectDB();

app.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
        res.render('index', { messages });
    } catch (err) {
        console.error('Error fetching messages:', err); 
        res.status(500).send('Server Error');
    }
});

app.post('/submit', async (req, res) => {
    const { name, message } = req.body;
    console.log('From data:', { name, message });

    if (name && message) {
        try{
            await Message.create({ name, message});
            console.log('Message saved:', { name, message });
            return res.redirect('/');
        }catch (err) {
            console.error('Error saving message:', err);
            return res.redirect('/');
        }
    } else {
        console.error('Name or message is missing');
        return res.redirect('/');
    }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
