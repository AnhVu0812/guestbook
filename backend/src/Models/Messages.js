const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);