const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = 'test';
const url = "mongodb+srv://bangs:pass@test.wsqcy.mongodb.net/test?retryWrites=true&w=majority/test";
// const url = "mongodb://bangs:redonly3@ds029901.mlab.com:29901/heroku_8q8sfxbw";
const MongoOptions = { useUnifiedTopology: true };

const state = {
    db: ''
};

// connect to mongo db
const cnct = (cb) => {
    if (state.db)
        cb();
    else {
        MongoClient.connect(url, MongoOptions, (err, client) => {
            if (err) cb(err);
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
};

const getDB = () => {
    return state.db;
}

module.exports = {getDB, cnct, getPrimaryKey};
