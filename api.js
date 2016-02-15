/**
 * Created by Andrea on 15/02/2016.
 */

var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoDbUtil = require("./MongoDbUtil");

module.exports = function(wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    api.post('/addNewPost', function(req, res) {
        mongoDbUtil.insert(req.body.data.newDocument, function() {
            res.json({});
        });
    });

    api.get('/getAll', function(req, res) {
        console.log("Get All");
        mongoDbUtil.findAll(function(docs) {
            res.json(docs);
        });
    });

    api.post('/:id/update', function(req, res) {
        mongoDbUtil.update(req.params.id, req.body.data.newDocument, function() {
            res.json({});
        });
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
