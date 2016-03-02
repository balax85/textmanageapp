/**
 * Created by Andrea on 14/02/2016.
 */

var url = 'mongodb://localhost:27017/textmanage';

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert'),
    ObjectID = require('mongodb').ObjectID;

exports.insert = function(newDocument, callback) {
    console.log('Insert new document');

    newDocument.inserDate = new Date();

    var insertDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Insert some documents
        collection.insertOne(newDocument, function(err, result) {
            callback(result);
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        insertDocuments(db, function(result) {
            db.close();
            callback(result);
        });
    });

};

exports.findAll = function(callback) {
    console.log('Find all documents');

    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            docs.forEach(function(entry) {
               entry.score = entry.title.length;
            });
            callback(docs);
        });
    }

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        findDocuments(db, function(docs) {
            db.close();
            callback(docs);
        });
    });
};

exports.findById = function(id, callback) {
    console.log('Find document by id');

    var findDocument = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Find some documents
        console.log("Find by id = " + id);
        var objectId = new ObjectID(id);
        collection.find({_id : objectId}).toArray(function(err, docs) {
            console.log("docs", docs);
            callback(docs);
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        findDocument(db, function(docs) {
            db.close();
            callback(docs);
        });
    });

};

exports.update = function(id, updatedDocument, callback) {
    console.log('Find document by id');

    var update = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('text');
        // Find some documents
        collection.findOneAndUpdate({_id : id}, updatedDocument, function(err, doc) {
            callback(doc);
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        update(db, function(docs) {
            db.close();
            callback(docs);
        });
    });
};