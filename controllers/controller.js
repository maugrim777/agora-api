const Thread = require('../models/thread.model')
const shortid = require('shortid')
const bcrypt = require('bcryptjs')


exports.getThreads =(req,res) => {
    const forum = req.path.slice(1, req.path.length-11)
    Thread.find({forum:forum}, {title:1, _id:1}).sort('-createdAt')
        .then(threads => {
            res.json(threads)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.createThread = (req,res) => {
    if(!req.body.title) {
        return res.status(400).send({
            message: "Thread title can not be empty"
        });
    }

    if(!req.body.deleteThread) {
        return res.status(400).send({
            message: "Thread delete password can not be empty"
        });
    }

    const thread = new Thread({
        _id: shortid.generate(),
        forum: req.body.forum,
        title: req.body.title,
        deleteThread: req.body.deleteThread,
        posts: []
    })

    thread.save()
        .then(data => {
            res.send(data)
            })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        })
}

exports.getOneThread = (req,res) => {
    threadID = req.params.thread

    Thread.findOne({_id:threadID})
        .then(thread => {
            res.json(thread)})
        .catch(err => console.log(err))
}

exports.deleteThread = (req,res) => {
    

    Thread.findOne({_id:req.params.thread})
        .then(response => {
            if (bcrypt.compareSync(req.body.deleteThread, response.deleteThread)) {
                Thread.deleteOne({_id:req.params.thread})
                    .then(response => {
                    console.log(response);
                    res.json('success')
                    })
                    .catch(err => res.json('error', err))
            } else {
                res.json('incorrect')
            }
            
        })
        .catch(err => res.json(err))
  
}

exports.createPost = (req,res) => {

    let newPost = {
        _id: shortid.generate(),
        content: req.body.content,
        deletePass: req.body.deletePass,
        likes: 0,
        created_on: new Date(),
        replies: []
    }

    Thread.findOne({_id: req.params.thread})
        .then(thread => {

            thread.posts.unshift(newPost)

            thread.save().then(data => res.json(data)).catch(err => res.json(err))
        })
        .catch(err => res.json(err))
}

exports.createReply = (req,res) => {
   

    let newReply = {
        _id: shortid.generate(),
        content: req.body.content,
        delPass: req.body.deletePass,
        created_on: new Date(),
    }

    Thread.findOne({_id:req.params.thread})
        .then(thread => {

            thread.posts = thread.posts.map((post) => {
                if (post._id === req.body.postID) {
                    post.replies.unshift(newReply)
                }

                return post
            })

            thread.save().then(data => res.json(data)).catch(err => res.json(err))
            
            
        })
        .catch(err => res.json(err))

    // res.send('hit backend')
}

exports.getPost = (req, res) => {

    Thread.findOne({_id: req.params.thread})
        .then(thread => {
            if (!thread) {
                res.json('thread not found')
            } else {
                let response = thread.posts.filter((post) => post._id === req.params.post)
                if (!response) {res.json('post not found')
                } else {res.json({response: response, thread: thread})}
            }
        })
        .catch(err => res.json(err))
}


exports.deletePost = (req,res) => {
    console.log('hit good')
    console.log(req.params)

    console.log(req.body)

    // res.send('bau')

    Thread.findOne({_id:req.params.thread})
        .then(thread => {
            console.log(thread)
            let del = false
            
            thread.posts = thread.posts.filter((post,i) => {
                if (post._id === req.params.post) {
                    if (bcrypt.compareSync(req.body.deletePost, post.deletePass)) {
                        console.log('match')
                        del = true
                    } else {
                        return post
                    }
                } else {return post}
            })
              
            if (del) {
                thread.save().then(response => res.json(response)).catch(err => res.json(err))
            } else {
                res.json('incorrect password')
            }
            
        })
        .catch(err => res.send(err))

    
  
}
