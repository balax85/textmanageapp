/**
 * Created by Andrea on 15/02/2016.
 */

var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoDbUtil = require("./MongoDbUtil");

/**
 * class that expose apis to manage the operation on db
 * @param wagner
 * @returns {*}
 */
module.exports = function(wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    //rest to add a new post
    api.post('/addNewPost', function(req, res) {
        console.log(req.body);
        mongoDbUtil.insert(req.body, function() {
            res.json({});
        });
    });

    //rest to get all the documents
    api.get('/getAll', function(req, res) {
        console.log("Get All");
        mongoDbUtil.findAll(function(docs) {
            res.json(docs);
        });
    });

    //rest to update a document
    api.post('/:id/update', function(req, res) {
        mongoDbUtil.update(req.params.id, req.body, function() {
            res.json({});
        });
    });

    //rest tp get a document
    api.get('/:id', function(req, res) {
        mongoDbUtil.findById(req.params.id, function(docs) {
            res.json(docs);
        });
    });

    //redirect to index.html for all others url
    api.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    return api;
};

function handleOne(property, res, error, result) {
    if (error) {
        return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
    }
    if (!result) {
        return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
    }

    var json = {};
    json[property] = result;
    res.json(json);
}
