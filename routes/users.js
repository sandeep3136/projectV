const express = require('express')
const userRoutes = express.Router();
const { ObjectId } = require('mongodb');
const mongoClient = require('../dbConn')


userRoutes.route('/users/add').post(async function (req, res) {
    var dataBase = await mongoClient.connect();
    var users = await dataBase.collection('users');
    let userObj = {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }
    try {
        var user = await users.insertOne(userObj);
        res.json({ "status": true, message: "user Created", user });
    } catch (e) {
        console.log(e);
        res.json({ "status": false, message: "Task error", error: e });
    };

})

userRoutes.route('/users/update/:id').post(async function (req, res) {
    var dataBase = await mongoClient.connect();
    var users = await dataBase.collection('users');
    let userObj = {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }
    try {
        var user = await users.findOneAndUpdate({"_id":ObjectId(req.params.id),$set:userObj});
        res.json({ "status": true, message: "user Created", user });
    } catch (e) {
        console.log(e);
        res.json({ "status": false, message: "Task error", error: e });
    };

})
userRoutes.route('/users/get/:id').get(async function (req, res) {
    var dataBase = await mongoClient.connect()
    var users = dataBase.collection('users')
    try {
        var users = await users.findOne({"_id" :  ObjectId(req.params.id)})
        res.json({ "status": true, message: "user fetched successfully", users });
    } catch (error) {
        console.log(error)
        res.json({ status: false, message: "Error" })
    }


})

userRoutes.route('/users/getAll').get(async function (req, res) {
    var dataBase = await mongoClient.connect()
    var users = dataBase.collection('users')
    try {
        var users = await users.find().toArray();
        res.json({ "status": true, message: "user fetched successfully", users });
    } catch (error) {
        console.log(error)
        res.json({ status: false, message: "Error" })
    }


})

module.exports = userRoutes;