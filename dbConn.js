// const { MongoClient } = require("mongodb");
// const Db = 'mongodb+srv://vamsi:aNkUL2aSROKsZxO6@myowncluster.p8dlbjs.mongodb.net/?retryWrites=true&w=majority';
const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://vamsi:aNkUL2aSROKsZxO6@myowncluster.p8dlbjs.mongodb.net/?retryWrites=true&w=majority';
let database = null 
exports.connect = async function(){
    if (database)
    {
        return database 
    }
     var client = new MongoClient(url)

     await client.connect();

     database = client.db("project")

     return database
}

exports.getCollection = async function(collectionName){
    var db = this.connect()
    return  db.collection(collectionName);

}
    

