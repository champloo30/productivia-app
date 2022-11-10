const express = require('express')

const myTasksRoutes = express.Router()

const dbo = require('../db/conn')

const ObjectId = require('mongodb').ObjectId

myTasksRoutes.route('/myTasks').get(function (req, res) {
    let db_connect = dbo.getDb('productivia')
    db_connect
        .collection('myTasks')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

myTasksRoutes.route('/myTasks/:id').get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('myTasks')
        .findOne(myquery, function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

myTasksRoutes.route('/myTasks/addTask').post(function (req, response) {
    let db_connect = dbo.getDb()
    let mytodo = {
        name: req.body.name,
        completed: req.body.completed,
    }
    db_connect.collection('myTasks').insertOne(mytodo, function (err, res) {
        if (err) throw err
        response.json(res)
    })
})

myTasksRoutes.route('/myTasks/edit/:id').post(function (req, response) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newvalues = {
        $set: {
            name: req.body.name,
        },
        $set: {
            completed: req.body.completed,
        }
    }
    db_connect
        .collection('myTasks')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err
            console.log('1 document updated');
            response.json(res)
        })
})

myTasksRoutes.route('/:id').delete((req, response) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect.collection('myTasks').deleteOne(myquery, function (err, obj) {
        if (err) throw err
        console.log('1 document deleted');
        response.json(obj)
    })
})

module.exports = myTasksRoutes