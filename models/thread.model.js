const mongoose = require('mongoose');


const threadSchema = mongoose.Schema({
    _id: String,
    forum: String,
    title: String,
    deleteThread: String,
    posts: [{
        _id: String,
        content: String,
        deletePass: String,
        likes: Number,
        created_on: Date,
        replies: [{_id:String, content: String, delPass: String, created_on: Date}] 
    }]

}, {
    timestamps: true
});



module.exports = mongoose.model('Thread', threadSchema);