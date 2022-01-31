const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://webapis:Dragonfly1977@cluster0.8svj0.mongodb.net/ecom?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async function (event, context) {
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const response = await collection.find()
    console.log('response',response)
    clnt.close()
    return {
        statusCode: 200,
        body: JSON.stringify({ data: response })
    }
}

