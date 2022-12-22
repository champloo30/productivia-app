const express = require('express')

const myNotesRoutes = express.Router()

const dbo = require('../models/notes.model')

const ObjectId = require('mongodb').ObjectId

myNotesRoutes.route('/myNotes').get(function (req, res) {
    let db_connect = dbo.getDb('productivia')
    db_connect
        .collection('myNotes')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

myNotesRoutes.route('/myNotes/:id').get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('myNotes')
        .findOne(myquery, function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

myNotesRoutes.route('/myNotes/addNote').post(function (req, response) {
    let db_connect = dbo.getDb()
    let mynote = {
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
    }
    db_connect.collection('myNotes').insertOne(mynote, function (err, res) {
        if (err) throw err
        response.json(res)
    })
})

myNotesRoutes.route('/myNotes/edit/:id').post(function (req, response) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newvalues = {
        $set: {
            title: req.body.title,
            content: req.body.content,
        }
    }
    db_connect
        .collection('myNotes')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err
            console.log('1 note updated');
            response.json(res)
        })
})

myNotesRoutes.route('/myNotes/:id').delete((req, response) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect.collection('myNotes').deleteOne(myquery, function (err, obj) {
        if (err) throw err
        console.log('1 note deleted');
        response.json(obj)
    })
})

module.exports = myNotesRoutes