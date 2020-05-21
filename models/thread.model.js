const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    _id: String,
    forum: String,
    title: String,
    deleteThread: String,
    replies: [
        {
            title: String,
            deleteReply: String
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model('Thread', threadSchema);