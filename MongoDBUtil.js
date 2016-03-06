/**
 * Created by Andrea on 14/02/2016.
 */

var url = 'mongodb://localhost:27017/textmanage';

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert'),
    ObjectID = require('mongodb').ObjectID;

//function to insert the document on mongodb
exports.insert = function(newDocument, callback) {
    newDocument.inserDate = new Date();

    var insertDocuments = function(db, callback) {
        var collection = db.collection('text');
        // Insert the document in mongo
        collection.insertOne(newDocument, function(err, result) {
            callback(result);
        });
    };

    //connection to db
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocuments(db, function(result) {
            db.close();
            callback(result);
        });
    });

};

//function to  find all the documents of mongo
exports.findAll = function(callback) {

    var findDocuments = function(db, callback) {
        var collection = db.collection('text');
        // Find all documents
        collection.find({}).toArray(function(err, docs) {
            docs.forEach(function(entry) {
               entry.score = entry.title.length;
            });
            callback(docs);
        });
    }

    //connection to db
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findDocuments(db, function(docs) {
            db.close();
            callback(docs);
        });
    });
};

//function to find a document by id
exports.findById = function(id, callback) {

    var findDocument = function(db, callback) {
        var collection = db.collection('text');
        //find the document with an id
        var objectId = new ObjectID(id);
        collection.find({_id : objectId}).toArray(function(err, docs) {
            console.log("docs", docs);
            callback(docs);
        });
    };

    //connect to db
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findDocument(db, function(docs) {
            db.close();
            callback(docs);
        });
    });

};

//fucntion to update a document
exports.update = function(id, updatedDocument, callback) {

    var update = function(db, callback) {
        var collection = db.collection('text');
        //find and update a document
        collection.findOneAndUpdate({_id : id}, updatedDocument, function(err, doc) {
            callback(doc);
        });
    };

    //connect to db
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        update(db, function(docs) {
            db.close();
            callback(docs);
        });
    });
};