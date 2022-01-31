const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://webapis:Dragonfly1977@cluster0.8svj0.mongodb.net/ecom?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function (event, context) {
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const cursor = await collection.find()
    const data = await cursor.toArray()
    console.log('response',cursor)
    clnt.close()
    return {
        statusCode: 200,
        body: JSON.stringify({ data })
    }
}

