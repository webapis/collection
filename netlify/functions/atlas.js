require('dotenv').config()
const { MongoClient } = require('mongodb');

//const uri = process.env.DEPLOY_URL === 'http://localhost:8888' ? process.env.mongodb_localUrl : process.env.mongodb_url;
const uri = process.env.mongodb_url;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
    const { gender, subcategory, page, category } = event.queryStringParameters
    const query = { subcategory: subcategory !== 'null' ? subcategory : undefined, category: category !== 'null' ? category : undefined, gender: gender !== 'null' ? gender : undefined }
debugger;
for(let item in query){
    let current =query[item]
    if(current===undefined){

        delete query[item]
    }
    debugger;
}
    const skip = parseInt(page)
    debugger;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const cursor = await collection.find(query).skip(skip).limit(70)

    const data = await cursor.toArray()

    clnt.close()
    debugger;
    return {
        statusCode: 200, headers,
        body: JSON.stringify({ data })
    }

}

