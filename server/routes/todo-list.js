const express = require('express')

const todoListRoutes = express.Router()

const dbo = require('../db/conn')

const ObjectId = require('mongodb').ObjectId

todoListRoutes.route('/todo-list').get(function (req, res) {
    let db_connect = dbo.getDb('productivia')
    db_connect
        .collection('todo-list')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

todoListRoutes.route('/todo-list/:id').get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('todo-list')
        .findOne(myquery, function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

todoListRoutes.route('/todo-list/add').post(function (req, response) {
    let db_connect = dbo.getDb()
    let mytodo = {
        name: req.body.name,
        completed: req.body.completed,
    }
    db_connect.collection('todo-list').insertOne(mytodo, function (err, res) {
        if (err) throw err
        response.json(res)
    })
})

todoListRoutes.route('/update/:id').post(function (req, response) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newvalues = {
        $set: {
            name: req.body.name,
            completed: req.body.completed,
        },
    }
    db_connect
        .collection('todo-list')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err
            console.log('1 document updated');
            response.json(res)
        })
})

todoListRoutes.route('/:id').delete((req, response) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect.collection('todo-list').deleteOne(myquery, function (err, obj) {
        if (err) throw err
        console.log('1 document deleted');
        response.json(obj)
    })
})

module.exports = todoListRoutes