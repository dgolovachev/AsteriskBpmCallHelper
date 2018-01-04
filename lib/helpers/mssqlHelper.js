var sql = require("mssql");

function selectQuery(config, queryString, callback) {
    if (!config) throw "config is undefined";
    if (!queryString) throw "queryString is undefined";
    callback = callback || function () { };

    var dbConnection = new sql.ConnectionPool(config);
    dbConnection.connect().then(() => {
        var request = new sql.Request(dbConnection);
        request.query(queryString).then((result) => {
            callback(null, result)
            dbConnection.close();
        }).catch((err) => {
            callback(err, null);
            dbConnection.close();
        });
    }).catch((err) => {
        callback(err, null);
    });

}

function insertQuery(config, queryString, callback) {
    if (!config) throw "config is undefined";
    if (!queryString) throw "queryString is undefined";
    callback = callback || function () { };

    var dbConnection = new sql.ConnectionPool(config);
    dbConnection.connect().then(() => {
        var transaction = new sql.Transaction(dbConnection);
        transaction.begin().then(() => {
            var request = new sql.Request(transaction);
            request.query(queryString).then(() => {
                transaction.commit().then((result) => {
                    callback(null, result);
                    dbConnection.close();
                }).catch((err) => {
                    callback("Error in Transaction Commit " + err, null);
                    dbConnection.close();
                });
            }).catch((err) => {
                callback("Error in Transaction Begin " + err, null);
                dbConnection.close();
            });
        }).catch((err) => {
            callback(err, null);
            dbConnection.close();
        });
    }).catch((err) => {
        callback(err, null);
    });

}

module.exports.selectQuery = selectQuery;
module.exports.insertQuery = insertQuery;