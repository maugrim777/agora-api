const Thread = require('../models/thread.model')
const shortid = require('shortid')


exports.getThreads =(req,res) => {
    const forum = req.path.slice(1, req.path.length-11)
    console.log(forum)
    Thread.find({forum:forum}, {title:1, _id:1})
        .then(threads => {
            console.log('The threads are: ',threads)
            res.json(threads)
        })
        .catch(err => {
            console.log('There was an error: ', err)
            res.send(err)
        })
}

exports.createThread = (req,res) => {
    console.log(req.body)
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
        deleteThread: req.body.deleteThread
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
    console.log(req.params.thread)
    threadID = req.params.thread
    console.log(req.params)

    Thread.findOne({_id:threadID})
        .then(thread => {
            console.log(thread)
            res.json(thread)})
        .catch(err => console.log(err))
    // res.send('hit')
}