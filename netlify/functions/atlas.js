require('dotenv').config()
const { MongoClient } = require('mongodb');

//const uri = process.env.DEPLOY_URL === 'http://localhost:8888' ? process.env.mongodb_localUrl : process.env.mongodb_url;
const uri = process.env.mongodb_url;
console.log('process.env', process.env)
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
    const { gender, subcategory } = event.queryStringParameters

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const cursor = await collection.find({ gender, subcategory }).skip(0).limit(70)
    let navCollection = null
    const data = await cursor.toArray()
    switch (gender) {
        case 'erkek':
            navCollection = clnt.db("ecom").collection("erkek-nav");
            break;
        case 'kadın':
            navCollection = clnt.db("ecom").collection("kadın-nav");
            break;
        default:

    }
    const navCursor = await navCollection.find()
    const navData = await navCursor.toArray()
    console.log('response', cursor)
    clnt.close()
    debugger;
    return {
        statusCode: 200, headers,
        body: JSON.stringify({ data, nav: navData })
    }

}

