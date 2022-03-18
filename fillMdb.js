require('dotenv').config()
const { MongoClient } = require('mongodb');


async function importData(clnt,collectionName,data){
    const collection = clnt.db("ecom").collection(collectionName);
    await collection.deleteMany({})
    console.log('data deleted')
    await collection.insertMany(data)
    console.log('data inserted')
}


async function fetchRemoteData(event, context) {
    const remoteUri = process.env.mongodb_remoteUrl;
    debugger;
    const client = new MongoClient(remoteUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const result=await clnt.db("ecom").listCollections().toArray()
    const collectionNames =result.map(r=>r.name)
   console.log('collectionNames',collectionNames)
     const promises =[]

     const localUri = process.env.mongodb_localUrl;
     debugger;
     const localclient = new MongoClient(localUri, { useNewUrlParser: true, useUnifiedTopology: true });
     const lclclnt = await localclient.connect()
    collectionNames.forEach(async c=>{
        promises.push(await importData(lclclnt,c,))
    })
    // const collection = clnt.db("ecom").collection("collection2023");
    // const cursor = await collection.find()
    // const data = await cursor.toArray()
    clnt.close()
    //await fillLocalMdb(data)

 
}

async function fillLocalMdb(data,collectionName) {
    const localUri = process.env.mongodb_localUrl;
    debugger;
    const client = new MongoClient(localUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection(collectionName);
    await collection.deleteMany({})
    console.log('data deleted')
    await collection.insertMany(data)
    console.log('data inserted')
       
   
    clnt.close()



}

fetchRemoteData()

function syncLocalRemoteData(){
    const remoteUri = process.env.mongodb_remoteUrl;
  
    const remoteClient = new MongoClient(remoteUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const remoteConnection = await remoteClient.connect()

    const localUri = process.env.mongodb_localUrl;
    const localClient = new MongoClient(localUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const localConnection = await localClient.connect()

    const remoteCollectionResult=await clnt.db("ecom").listCollections().toArray()
    const remoteCollectionNames =remoteCollectionResult.map(r=>r.name)
    



}