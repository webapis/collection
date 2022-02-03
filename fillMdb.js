require('dotenv').config()
const { MongoClient } = require('mongodb');





async function fetchRemoteData(event, context) {
    const remoteUri = process.env.mongodb_remoteUrl;
    debugger;
    const client = new MongoClient(remoteUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const cursor = await collection.find()
    const data = await cursor.toArray()
    clnt.close()
    await fillLocalMdb(data)
    
}

async function fillLocalMdb(data) {
    const localUri = process.env.mongodb_localUrl;
    debugger;
    const client = new MongoClient(localUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    await collection.deleteMany({})
    console.log('data deleted')
    await collection.insertMany(data)
    console.log('data inserted')
    clnt.close()



}

fetchRemoteData()