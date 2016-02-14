/**
 * Created by Andrea on 14/02/2016.
 */

var url = 'mongodb://localhost:27017/textmanage';

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

exports.insert = function(newDocument) {
    console.log('Insert new document');

    newDocument.inserDate = new Date();

    var insertDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Insert some documents
        collection.insert(newDocument, function(err, result) {
            console.log("result", result);
            callback(result);
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        insertDocuments(db, function() {
            db.close();
        });
    });

};

exports.findAll = function(newDocument) {
    console.log('Find all documents');

    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.dir(docs);
            callback(docs);
        });
    }

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        findDocuments(db, function() {
            db.close();
        });
    });

};
