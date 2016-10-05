var csv = require('csv-parser');
var fs = require("fs");

var createAllInsertData = [];
var createAllInsert;


var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost/your_db_name';



fs.createReadStream('test.csv')
.pipe(csv())
.on('data', function (data) {
    createAllInsert = ({  "dbjsonkey1" : data.key_One_CSV_Value, "dbjsonkey2" : data.key_Two_CSV_Value });
   createAllInsertData.push(createAllInsert);
})
.on('end', function () {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('table_column_name');

            collection.insert(createAllInsertData, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
    // do some work here with the database.

    //Close connection
              db.close();
            });
          }
    });
})